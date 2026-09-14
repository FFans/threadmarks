import Mithril from 'mithril';

import Component, { ComponentAttrs } from 'flarum/common/Component';
import Discussion from 'flarum/common/models/Discussion';
import extractText from 'flarum/common/utils/extractText';
import app from 'flarum/forum/app';

import Threadmark from '../models/Threadmark';
import { discussionThreadmarks } from '../utils/discussionThreadmarks';
import { openThreadmarkDirectory } from '../utils/threadmarkDirectory';
import { getThreadmarkNavigationIndex } from '../utils/threadmarkNavigation';
import threadmarkTypeLabel from '../utils/threadmarkTypeLabel';

const CLUSTER_DISTANCE = 12;

export interface ThreadmarkScrubberMarkersAttrs extends ComponentAttrs {
  discussion: Discussion;
  onNavigate: (threadmark: Threadmark) => void;
}

interface Marker {
  threadmark: Threadmark;
  position: number;
  y: number;
}

export default class ThreadmarkScrubberMarkers extends Component<ThreadmarkScrubberMarkersAttrs> {
  private height = 0;
  private resizeObserver?: ResizeObserver;

  oncreate(vnode: Mithril.VnodeDOM<ThreadmarkScrubberMarkersAttrs, this>) {
    super.oncreate(vnode);

    this.updateHeight();

    this.resizeObserver = new ResizeObserver(() => {
      const oldHeight = this.height;

      this.updateHeight();

      if (this.height !== oldHeight) {
        m.redraw();
      }
    });

    this.resizeObserver.observe(this.element);

    // 首次渲染时 height 还是 0，需要在拿到真实高度后重绘一次。
    m.redraw();
  }

  onremove(vnode: Mithril.VnodeDOM<ThreadmarkScrubberMarkersAttrs, this>) {
    super.onremove(vnode);

    this.resizeObserver?.disconnect();
  }

  view() {
    const discussion = this.attrs.discussion;
    const threadmarks = discussionThreadmarks(discussion);

    if (!threadmarks.length || !this.height) {
      return <div className="ThreadmarkScrubberMarkers" />;
    }

    // Match Core's post stream: post numbers can have gaps and discussion counters can be stale.
    const lastIndex = discussion.postIds().length - 1;

    const markers = threadmarks
      .map((threadmark): Marker | null => {
        // 是否可跳转
        const index = getThreadmarkNavigationIndex(discussion, threadmark);

        if (index === null) {
          return null;
        }

        const position = lastIndex <= 0 ? 0 : Math.max(0, Math.min(index, lastIndex)) / lastIndex;

        return {
          threadmark,
          position,
          y: position * this.height,
        };
      })
      .filter((marker): marker is Marker => marker !== null)
      .sort((a, b) => a.y - b.y);

    const groups = this.groupMarkers(markers);

    return (
      <div className="ThreadmarkScrubberMarkers">
        {groups.map((group) => {
          const position = group.reduce((sum, marker) => sum + marker.position, 0) / group.length;

          if (group.length === 1) {
            const threadmark = group[0].threadmark;
            const type = threadmark.type();
            const note = threadmark.note();

            return (
              <div
                role="group"
                className="ThreadmarkScrubberMarker"
                style={{
                  top: `${position * 100}%`,
                  backgroundColor: type.color(),
                  '--threadmark-color': type.color(),
                }}
                onclick={(e: MouseEvent) => {
                  e.stopPropagation();
                  this.attrs.onNavigate(threadmark);
                }}
              >
                <button
                  type="button"
                  className="ThreadmarkScrubberMarker-hit"
                  aria-label={extractText(
                    app.translator.trans('ffans-threadmarks.forum.scrubber.threadmark_a11y_label', { number: threadmark.originalPostNumber() })
                  )}
                />
                {this.viewMarkersCollapse(group)}
              </div>
            );
          }

          const threadmark = group[0].threadmark;
          const type = threadmark.type();

          return (
            <div
              role="group"
              className="ThreadmarkScrubberMarker ThreadmarkScrubberMarker--cluster"
              style={{
                top: `${position * 100}%`,
                backgroundColor: type.color(),
                '--threadmark-color': type.color(),
              }}
              onclick={(e: MouseEvent) => {
                e.stopPropagation();
                this.attrs.onNavigate(threadmark);
              }}
            >
              <button
                type="button"
                className="ThreadmarkScrubberMarker-hit"
                aria-label={extractText(app.translator.trans('ffans-threadmarks.forum.scrubber.cluster_a11y_label', { count: group.length }))}
              />
              <i>{group.length}</i>
              {this.viewMarkersCollapse(group)}
            </div>
          );
        })}
      </div>
    );
  }

  private viewMarkersCollapse(group: Marker[]) {
    return (
      <div className="ThreadmarkScrubberMarker-collapse">
        <button
          type="button"
          className="ThreadmarkScrubberMarker-openDirectory"
          title={extractText(app.translator.trans('ffans-threadmarks.forum.scrubber.open_directory_a11y_label'))}
          aria-label={extractText(app.translator.trans('ffans-threadmarks.forum.scrubber.open_directory_a11y_label'))}
          onclick={(event: MouseEvent) => {
            event.stopPropagation();
            openThreadmarkDirectory(this.attrs.discussion.id()!);
          }}
        >
          <i className="icon fas fa-expand-alt" aria-hidden="true" />
        </button>
        <ul className="ThreadmarkScrubberMarker-collapseList">
          {group.map(({ threadmark }) => {
            const type = threadmark.type();
            return (
              <li
                className="ThreadmarkScrubberMarker-collapseItem"
                style={{ '--threadmark-color': type.color() }}
                onclick={(e: MouseEvent) => {
                  e.stopPropagation();
                  this.attrs.onNavigate(threadmark);
                }}
              >
                {type.icon() && <i className={`icon ${type.icon()}`} aria-hidden="true"></i>}

                {threadmark.note() ? (
                  <span className="ThreadmarkScrubberMarker-collapseNote">{threadmark.note()}</span>
                ) : (
                  <span className="ThreadmarkScrubberMarker-collapseLabel">{threadmarkTypeLabel(type)}</span>
                )}
                {threadmark.isPersonal() && (
                  <span className="ThreadmarkMineBadge">{app.translator.trans('ffans-threadmarks.forum.threadmark.mine_badge')}</span>
                )}

                <span className="ThreadmarkScrubberMarker-collapseNumber">#{threadmark.originalPostNumber()}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  private updateHeight() {
    this.height = this.element.clientHeight;
  }

  /**
   * 聚合点
   * 0px, 10px, 20px -> [0, 10], [20]
   */
  private groupMarkers(markers: Marker[]): Marker[][] {
    const groups: Marker[][] = [];

    for (const marker of markers) {
      const group = groups[groups.length - 1];

      if (!group) {
        groups.push([marker]);
        continue;
      }

      const first = group[0];

      if (marker.y - first.y < CLUSTER_DISTANCE) {
        group.push(marker);
      } else {
        groups.push([marker]);
      }
    }

    return groups;
  }
}
