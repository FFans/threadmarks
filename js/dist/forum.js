/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/extend.ts"
/*!******************************!*\
  !*** ./src/common/extend.ts ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extenders */ "flarum/common/extenders");
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_ThreadmarkType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/ThreadmarkType */ "./src/common/models/ThreadmarkType.ts");



// oxfmt-ignore
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Store)().add('threadmark-types', _models_ThreadmarkType__WEBPACK_IMPORTED_MODULE_1__["default"])]);

/***/ },

/***/ "./src/common/index.ts"
/*!*****************************!*\
  !*** ./src/common/index.ts ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_0__);

flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('ffans-threadmarks-common', () => {
  console.log('[ffans/threadmarks] Hello, forum and admin!');
});

/***/ },

/***/ "./src/common/models/ThreadmarkType.ts"
/*!*********************************************!*\
  !*** ./src/common/models/ThreadmarkType.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThreadmarkType)
/* harmony export */ });
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_0__);

class ThreadmarkType extends (flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default()) {
  key = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().attribute('key'))();
  name = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().attribute('name'))();
  color = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().attribute('color'))();
  icon = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().attribute('icon'))();
  position = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().attribute('position'))();
  isBuiltin = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().attribute('isBuiltin'))();
  isEnabled = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().attribute('isEnabled'))();
  canDelete = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().attribute('canDelete'))();
  createdAt = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().attribute('createdAt', (flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().transformDate)))();
  updatedAt = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().attribute('updatedAt', (flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().transformDate)))();
}
flarum.reg.add('ffans-threadmarks', 'common/models/ThreadmarkType', ThreadmarkType);

/***/ },

/***/ "./src/forum/components/ManageThreadmarkModal.tsx"
/*!********************************************************!*\
  !*** ./src/forum/components/ManageThreadmarkModal.tsx ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ManageThreadmarkModal)
/* harmony export */ });
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Form */ "flarum/common/components/Form");
/* harmony import */ var flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/FormModal */ "flarum/common/components/FormModal");
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Icon */ "flarum/common/components/Icon");
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/models/Post */ "flarum/common/models/Post");
/* harmony import */ var flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/utils/Stream */ "flarum/common/utils/Stream");
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _utils_threadmarkTypeLabel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/threadmarkTypeLabel */ "./src/forum/utils/threadmarkTypeLabel.ts");










class ManageThreadmarkModal extends (flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_2___default()) {
  activeScope = 'discussion';
  drafts = (() => ({
    personal: {
      typeId: flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default()(''),
      note: flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default()('')
    },
    discussion: {
      typeId: flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default()(''),
      note: flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default()('')
    }
  }))();
  oninit(vnode) {
    super.oninit(vnode);
    this.post = this.attrs.post || flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().store.getById('posts', String(this.attrs.threadmark?.originalPostId()));
    this.activeScope = this.attrs.threadmark?.isPersonal() ? 'personal' : 'discussion';
    this.resetDraft('personal');
    this.resetDraft('discussion');
    this.loading = !(flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().threadmarkTypeList).loaded;
    if (!this.loading) {
      this.finishLoading();
      return;
    }
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().threadmarkTypeList.load().catch(() => {}).finally(() => {
      this.finishLoading();
      m.redraw();
    });
  }
  finishLoading() {
    for (const scope of ['personal', 'discussion']) {
      if (!this.drafts[scope].typeId()) this.drafts[scope].typeId(this.types(scope)[0]?.id() || '');
    }
    if (!this.scopes().includes(this.activeScope)) this.activeScope = this.scopes()[0] || 'personal';
    this.loading = false;
  }
  className() {
    return 'ManageThreadmarkModal';
  }
  title() {
    return flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('ffans-threadmarks.forum.manage_modal.title', {
      number: this.post?.number() ?? this.attrs.threadmark?.originalPostNumber()
    }));
  }
  mark(scope) {
    if (scope === void 0) {
      scope = this.activeScope;
    }
    const id = this.attrs.post ? Number(this.attrs.post.id()) : this.attrs.threadmark?.originalPostId();
    const relationship = scope === 'personal' ? 'personalThreadmarks' : 'threadmarks';
    return (this.attrs.discussion[relationship]() || []).find(mark => mark && mark.originalPostId() === id);
  }
  scopes() {
    const discussion = this.attrs.discussion;
    const canCreate = !this.attrs.threadmark?.isPostDeleted() && (this.post ? this.post.contentType() === 'comment' && this.post.number() > 1 && !this.post.isHidden() : !!this.attrs.threadmark && this.attrs.threadmark.originalPostNumber() > 1);
    return ['discussion', 'personal'].filter(scope => {
      const mark = this.mark(scope);
      if (mark) return mark.canEdit();
      return !!canCreate && (scope === 'personal' ? discussion.canManagePersonalThreadmarks() : discussion.canManageThreadmarks());
    });
  }
  selectScope(scope) {
    if (this.loading || !this.scopes().includes(scope)) return;
    this.activeScope = scope;
    this.alertAttrs = null;
  }
  types(scope) {
    if (scope === void 0) {
      scope = this.activeScope;
    }
    const currentTypeId = this.mark(scope)?.type()?.id();
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().threadmarkTypeList.all().filter(type => type.isEnabled() || type.id() === currentTypeId).sort((a, b) => a.position() - b.position());
  }
  resetDraft(scope) {
    const mark = this.mark(scope);
    this.drafts[scope].typeId(mark?.type()?.id() || this.types(scope)[0]?.id() || '');
    this.drafts[scope].note(mark?.note() || '');
  }
  content() {
    const scopes = this.scopes();
    const draft = this.drafts[this.activeScope];
    const mark = this.mark();
    const types = this.types();
    const selectedType = types.find(type => type.id() === draft.typeId());
    const hasSelectedType = !!selectedType;
    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "ManageThreadmarkModal-tabs",
      role: "tablist",
      "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('ffans-threadmarks.forum.manage_modal.scope_a11y_label'))
    }, scopes.map(scope => m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0___default()), {
      key: scope,
      id: `threadmark-tab-${scope}`,
      type: "button",
      role: "tab",
      className: `Button ManageThreadmarkModal-tab ${scope === this.activeScope ? 'Button--primary' : 'Button--link'}`,
      icon: this.mark(scope) ? 'fas fa-check' : undefined,
      active: scope === this.activeScope,
      "aria-selected": scope === this.activeScope,
      "aria-controls": "threadmark-panel",
      disabled: this.loading,
      onclick: () => this.selectScope(scope)
    }, scope === 'personal' ? flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('ffans-threadmarks.forum.manage_modal.personal_tab') : flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('ffans-threadmarks.forum.manage_modal.discussion_tab')))), m("div", {
      id: "threadmark-panel",
      role: "tabpanel",
      "aria-labelledby": `threadmark-tab-${this.activeScope}`
    }, !scopes.includes(this.activeScope) ? m("p", {
      className: "helpText"
    }, this.loading ? flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('ffans-threadmarks.forum.manage_modal.loading_text') : flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('ffans-threadmarks.forum.manage_modal.unavailable_text')) : m((flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_1___default()), null, m("div", {
      className: "Form-group"
    }, m("label", {
      for: "threadmark-type"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('ffans-threadmarks.forum.manage_modal.type_label')), m("div", {
      className: "ManageThreadmarkModal-typeSelect"
    }, selectedType && m("span", {
      className: "ManageThreadmarkModal-typePreview",
      "aria-hidden": "true",
      style: {
        color: selectedType.color()
      }
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3___default()), {
      name: selectedType.icon() || 'fas fa-bookmark'
    })), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_4___default()), {
      id: "threadmark-type",
      value: hasSelectedType ? draft.typeId() : '',
      onchange: draft.typeId,
      options: {
        ...(!hasSelectedType ? {
          '': flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('ffans-threadmarks.forum.manage_modal.type_placeholder'))
        } : {}),
        ...Object.fromEntries(types.map(type => [type.id(), (0,_utils_threadmarkTypeLabel__WEBPACK_IMPORTED_MODULE_9__["default"])(type)]))
      },
      disabled: this.loading || !types.length
    }))), m("div", {
      className: "Form-group"
    }, m("label", {
      for: "threadmark-note"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('ffans-threadmarks.forum.manage_modal.note_label')), m("textarea", {
      id: "threadmark-note",
      name: "note",
      className: "FormControl",
      bidi: draft.note,
      placeholder: flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('ffans-threadmarks.forum.manage_modal.note_placeholder')),
      maxlength: 100,
      disabled: this.loading
    })), m("div", {
      className: "Form-group Form-controls"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0___default()), {
      type: "submit",
      className: "Button Button--primary",
      loading: this.loading,
      disabled: this.loading || !hasSelectedType
    }, mark ? flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('ffans-threadmarks.forum.manage_modal.save_button') : flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('ffans-threadmarks.forum.manage_modal.add_button')), mark && m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0___default()), {
      type: "button",
      icon: "fas fa-trash-alt",
      className: "Button Button--danger",
      disabled: this.loading,
      onclick: () => this.deleteThreadmark()
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('ffans-threadmarks.forum.manage_modal.delete_button'))))));
  }
  async onsubmit(event) {
    event.preventDefault();
    const scope = this.activeScope;
    if (this.loading || !this.scopes().includes(scope)) return;
    const draft = this.drafts[scope];
    const type = flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().store.getById('threadmark-types', draft.typeId());
    const existing = this.mark(scope);
    if (!type || !type.isEnabled() && type.id() !== existing?.type()?.id()) return;
    const postId = this.post?.id() || this.attrs.threadmark?.originalPostId();
    if (!existing && !postId) return;
    const mark = existing || flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().store.createRecord(scope === 'personal' ? 'personal-threadmarks' : 'threadmarks');
    this.loading = true;
    try {
      const saved = await mark.save({
        note: draft.note().trim() || null,
        relationships: existing ? {
          type
        } : {
          type,
          // just for relationship
          post: this.post || new (flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_5___default())({
            type: 'posts',
            id: String(postId)
          })
        }
      });
      if (!existing) {
        const relationship = scope === 'personal' ? 'personalThreadmarks' : 'threadmarks';
        this.attrs.discussion.pushData({
          relationships: {
            [relationship]: [...(this.attrs.discussion[relationship]() || []).filter(item => !!item), saved]
          }
        });
      }
      this.post?.pushData({});
      this.hide();
    } catch {
      // Flarum displays request errors in the active modal.
    } finally {
      this.loading = false;
      m.redraw();
    }
  }
  async deleteThreadmark() {
    const scope = this.activeScope;
    const mark = this.mark(scope);
    if (this.loading || !mark || !this.scopes().includes(scope)) return;
    if (!confirm(scope === 'personal' ? flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('ffans-threadmarks.forum.manage_modal.delete_personal_confirmation')) : flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('ffans-threadmarks.forum.manage_modal.delete_discussion_confirmation')))) return;
    this.loading = true;
    try {
      await mark.delete();
      const relationship = scope === 'personal' ? 'personalThreadmarks' : 'threadmarks';
      this.attrs.discussion.pushData({
        relationships: {
          [relationship]: (this.attrs.discussion[relationship]() || []).filter(item => !!item && item.id() !== mark.id())
        }
      });
      this.post?.pushData({});
      this.resetDraft(scope);
      if (!this.scopes().includes(scope)) this.activeScope = this.scopes()[0] || scope;
    } catch {
      // Flarum displays request errors in the active modal.
    } finally {
      this.loading = false;
      m.redraw();
    }
  }
}
flarum.reg.add('ffans-threadmarks', 'forum/components/ManageThreadmarkModal', ManageThreadmarkModal);

/***/ },

/***/ "./src/forum/components/ThreadmarkBlock.tsx"
/*!**************************************************!*\
  !*** ./src/forum/components/ThreadmarkBlock.tsx ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThreadmarkLabel)
/* harmony export */ });
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_threadmarkTypeLabel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/threadmarkTypeLabel */ "./src/forum/utils/threadmarkTypeLabel.ts");




class ThreadmarkLabel extends (flarum_common_Component__WEBPACK_IMPORTED_MODULE_0___default()) {
  view(vnode) {
    const threadmark = this.attrs.threadmark;
    const type = threadmark.type();
    return m("div", {
      className: "ThreadmarkBlock",
      style: {
        '--threadmark-color': type.color()
      }
    }, type.icon() && m("i", {
      className: `icon ${type.icon()}`,
      "aria-hidden": "true"
    }), threadmark.note() ? m("span", {
      className: "ThreadmarkLabel-note"
    }, threadmark.note()) : m("span", {
      className: "ThreadmarkLabel-type"
    }, (0,_utils_threadmarkTypeLabel__WEBPACK_IMPORTED_MODULE_3__["default"])(type)), threadmark.isPersonal() && m("span", {
      className: "ThreadmarkMineBadge",
      title: flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_1___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('ffans-threadmarks.forum.threadmark.personal_tooltip'))
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('ffans-threadmarks.forum.threadmark.mine_badge')));
  }
}
flarum.reg.add('ffans-threadmarks', 'forum/components/ThreadmarkBlock', ThreadmarkLabel);

/***/ },

/***/ "./src/forum/components/ThreadmarkDirectory.tsx"
/*!******************************************************!*\
  !*** ./src/forum/components/ThreadmarkDirectory.tsx ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThreadmarkDirectory)
/* harmony export */ });
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Icon */ "flarum/common/components/Icon");
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/discussionThreadmarks */ "./src/forum/utils/discussionThreadmarks.ts");
/* harmony import */ var _utils_threadmarkDirectory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/threadmarkDirectory */ "./src/forum/utils/threadmarkDirectory.ts");
/* harmony import */ var _ThreadmarkList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ThreadmarkList */ "./src/forum/components/ThreadmarkList.tsx");








const POSITION_KEY = 'ffans-threadmarks.directory-position';
class ThreadmarkDirectory extends (flarum_common_Component__WEBPACK_IMPORTED_MODULE_0___default()) {
  isOpened = false;
  phone = false;
  scope = 'all';
  openRequested = event => {
    if (event.detail !== this.attrs.discussion.id()) return;
    if (!this.isOpened) this.open();else (this.panel || this.element)?.querySelector('.ThreadmarkDirectory-close')?.focus();
    m.redraw();
  };
  resize = () => {
    const phone = flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().screen() === 'phone';
    if (phone !== this.phone) {
      this.close();
      this.phone = phone;
    }
    if (this.isOpened) this.clamp();
    m.redraw();
  };
  oninit(vnode) {
    super.oninit(vnode);
    this.phone = flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().screen() === 'phone';
  }
  oncreate(vnode) {
    super.oncreate(vnode);
    this.$().on('shown.bs.dropdown.threadmarks', () => {
      this.isOpened = true;
      if ('CloseWatcher' in window) {
        this.closeWatcher?.destroy();
        this.closeWatcher = new CloseWatcher();
        this.closeWatcher.onclose = () => this.close();
      }
      m.redraw();
    });
    this.$().on('hidden.bs.dropdown.threadmarks', () => {
      this.isOpened = false;
      this.closeWatcher?.destroy();
      this.closeWatcher = undefined;
      m.redraw();
    });
    this.host = document.createElement('div');
    document.body.appendChild(this.host);
    m.mount(this.host, {
      view: () => this.window()
    });
    window.addEventListener('resize', this.resize);
    window.addEventListener(_utils_threadmarkDirectory__WEBPACK_IMPORTED_MODULE_6__.DIRECTORY_OPEN_EVENT, this.openRequested);
  }
  onremove(vnode) {
    this.close();
    this.$().off('.threadmarks');
    this.closeWatcher?.destroy();
    window.removeEventListener('resize', this.resize);
    window.removeEventListener(_utils_threadmarkDirectory__WEBPACK_IMPORTED_MODULE_6__.DIRECTORY_OPEN_EVENT, this.openRequested);
    if (this.host) {
      m.mount(this.host, null);
      this.host.remove();
    }
    super.onremove(vnode);
  }
  view() {
    return m("div", {
      className: this.phone ? 'Dropdown ThreadmarkDirectory-mobile' : 'ButtonGroup ThreadmarkDirectory-control'
    }, !this.phone && this.attrs.onlyModeControl, m("button", {
      type: "button",
      className: `Button Button--icon Dropdown-toggle ThreadmarkDirectory-toggle ${this.isOpened ? 'active' : ''}`,
      "data-toggle": this.phone ? 'dropdown' : undefined,
      "aria-label": this.isOpened ? flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_3___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('ffans-threadmarks.forum.directory.close_a11y_label')) : flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_3___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('ffans-threadmarks.forum.directory.show_button_a11y_label')),
      "aria-expanded": this.isOpened ? 'true' : 'false',
      "aria-pressed": this.isOpened ? 'true' : 'false',
      onclick: this.phone ? undefined : event => {
        event.stopPropagation();
        this.isOpened ? this.close() : this.open();
      }
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_2___default()), {
      name: "fas fa-list",
      className: "Button-icon"
    })), this.phone && m("div", {
      className: "Dropdown-menu dropdown-menu ThreadmarkDirectory-mobileMenu"
    }, m("header", {
      className: "ThreadmarkDirectory-header"
    }, m("strong", {
      className: "ThreadmarkDirectory-mobileTitle"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('ffans-threadmarks.forum.directory.title')), m("button", {
      type: "button",
      className: "Button Button--icon Button--link ThreadmarkDirectory-close",
      "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_3___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('ffans-threadmarks.forum.directory.close_a11y_label')),
      onclick: () => this.close()
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_2___default()), {
      name: "fas fa-times"
    }))), this.attrs.onlyModeControl && m("div", {
      className: "ThreadmarkDirectory-readingMode",
      onclick: event => {
        event.stopPropagation();
        this.close();
      }
    }, this.attrs.onlyModeControl), this.directoryContent()));
  }
  open() {
    if (this.phone) {
      this.element.querySelector('.Dropdown-toggle')?.click();
      return;
    }
    try {
      const saved = JSON.parse(localStorage.getItem(POSITION_KEY) || 'null');
      if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) this.position = saved;
    } catch {
      /* Storage can be unavailable. */
    }
    if (!this.position) {
      const anchor = this.element.getBoundingClientRect();
      this.position = {
        x: anchor.left - 376,
        y: anchor.top
      };
    }
    this.isOpened = true;
    const dropdown = this.element.closest('.Dropdown.open');
    dropdown?.querySelector('[data-toggle="dropdown"]')?.click();
  }
  close() {
    if (this.phone && this.isOpened) {
      this.element.querySelector('.Dropdown-toggle')?.click();
    }
    this.isOpened = false;
    this.drag = undefined;
    this.element.querySelector('.ThreadmarkDirectory-toggle')?.focus();
  }
  clamp() {
    if (!this.panel || !this.position || window.matchMedia('(max-width: 767px)').matches) return;
    this.position.x = Math.max(8, Math.min(this.position.x, document.documentElement.clientWidth - this.panel.offsetWidth - 8));
    this.position.y = Math.max(8, Math.min(this.position.y, document.documentElement.clientHeight - this.panel.offsetHeight - 8));
    this.panel.style.left = `${this.position.x}px`;
    this.panel.style.top = `${this.position.y}px`;
  }
  save() {
    try {
      localStorage.setItem(POSITION_KEY, JSON.stringify(this.position));
    } catch {
      /* Optional preference. */
    }
  }
  window() {
    if (!this.isOpened || this.phone) return null;
    return m("section", {
      className: "ThreadmarkDirectory",
      role: "dialog",
      "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_3___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('ffans-threadmarks.forum.directory.title')),
      style: {
        left: `${this.position?.x ?? 8}px`,
        top: `${this.position?.y ?? 8}px`
      },
      oncreate: vnode => {
        this.panel = vnode.dom;
        this.clamp();
        this.panel.querySelector('.ThreadmarkDirectory-close')?.focus();
      },
      onremove: () => {
        this.panel = undefined;
      },
      onkeydown: event => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          this.close();
        }
      }
    }, m("header", {
      className: "ThreadmarkDirectory-header"
    }, m("div", {
      className: "ThreadmarkDirectory-drag",
      onpointerdown: event => {
        if (event.button !== 0 || window.matchMedia('(max-width: 767px)').matches || !this.position) return;
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        this.drag = {
          id: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          left: this.position.x,
          top: this.position.y
        };
      },
      onpointermove: event => {
        if (!this.drag || this.drag.id !== event.pointerId) return;
        this.position = {
          x: this.drag.left + event.clientX - this.drag.x,
          y: this.drag.top + event.clientY - this.drag.y
        };
        this.clamp();
      },
      onpointerup: () => {
        this.drag = undefined;
        this.save();
      },
      onpointercancel: () => {
        this.drag = undefined;
      }
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_2___default()), {
      name: "fas fa-grip-vertical"
    }), m("strong", null, flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('ffans-threadmarks.forum.directory.title'))), m("button", {
      type: "button",
      className: "Button Button--icon Button--link ThreadmarkDirectory-close",
      "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_3___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('ffans-threadmarks.forum.directory.close_a11y_label')),
      onclick: () => this.close()
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_2___default()), {
      name: "fas fa-times"
    }))), this.directoryContent());
  }
  directoryContent() {
    const marks = (0,_utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_5__.discussionThreadmarks)(this.attrs.discussion);
    const hasDiscussion = marks.some(mark => !mark.isPersonal());
    const hasPersonal = marks.some(mark => mark.isPersonal());
    const scopes = ['all', 'discussion', 'personal'].filter(scope => scope === 'all' ? hasDiscussion && hasPersonal : scope === 'discussion' ? hasDiscussion : hasPersonal);
    if (!scopes.includes(this.scope)) this.scope = scopes[0] ?? 'all';
    return m('[', null, scopes.length > 1 && m("div", {
      className: "ThreadmarkDirectory-filters",
      role: "group",
      "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_3___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('ffans-threadmarks.forum.directory.scope_a11y_label'))
    }, scopes.map(scope => m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1___default()), {
      key: scope,
      type: "button",
      className: `Button Button--small ${this.scope === scope ? 'Button--primary' : 'Button--block'}`,
      "aria-pressed": this.scope === scope ? 'true' : 'false',
      onclick: event => {
        event.stopPropagation();
        this.scope = scope;
      }
    }, scope === 'all' ? flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('ffans-threadmarks.forum.directory.all_filter') : scope === 'personal' ? flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('ffans-threadmarks.forum.directory.personal_filter') : flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('ffans-threadmarks.forum.directory.discussion_filter')))), m("div", {
      className: "ThreadmarkDirectory-content"
    }, m(_ThreadmarkList__WEBPACK_IMPORTED_MODULE_7__["default"], {
      discussion: this.attrs.discussion,
      onNavigate: this.attrs.onNavigate,
      scope: this.scope
    })));
  }
}
flarum.reg.add('ffans-threadmarks', 'forum/components/ThreadmarkDirectory', ThreadmarkDirectory);

/***/ },

/***/ "./src/forum/components/ThreadmarkList.tsx"
/*!*************************************************!*\
  !*** ./src/forum/components/ThreadmarkList.tsx ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThreadmarkList)
/* harmony export */ });
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Icon */ "flarum/common/components/Icon");
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/discussionThreadmarks */ "./src/forum/utils/discussionThreadmarks.ts");
/* harmony import */ var _utils_threadmarkTypeLabel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/threadmarkTypeLabel */ "./src/forum/utils/threadmarkTypeLabel.ts");
/* harmony import */ var _ManageThreadmarkModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ManageThreadmarkModal */ "./src/forum/components/ManageThreadmarkModal.tsx");







class ThreadmarkList extends (flarum_common_Component__WEBPACK_IMPORTED_MODULE_0___default()) {
  view(vnode) {
    const threadmarks = this.threadmarks();
    if (!threadmarks.length) return;
    return m("div", {
      class: "ThreadmarkList"
    }, m("ul", {
      class: "ThreadmarkList-items"
    }, threadmarks.map(threadmark => {
      const type = threadmark.type();
      const number = threadmark.originalPostNumber();
      const note = threadmark.note();
      return m("li", {
        class: "ThreadmarkList-item",
        key: threadmark.key()
      }, m("button", {
        type: "button",
        className: "ThreadmarkList-button",
        onclick: () => this.goToThreadmark(threadmark)
      }, m("span", {
        className: "ThreadmarkList-number"
      }, "#", number), m("span", {
        className: "ThreadmarkList-type",
        style: {
          color: type.color()
        }
      }, type.icon() && m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_1___default()), {
        name: type.icon()
      })), note ? m("span", {
        className: "ThreadmarkList-note"
      }, note) : m("span", {
        className: "ThreadmarkList-label"
      }, (0,_utils_threadmarkTypeLabel__WEBPACK_IMPORTED_MODULE_5__["default"])(type)), threadmark.isPersonal() && m("span", {
        className: "ThreadmarkMineBadge"
      }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('ffans-threadmarks.forum.threadmark.mine_badge'))), threadmark.canEdit() && m("button", {
        type: "button",
        className: "Button Button--icon Button--link ThreadmarkList-edit",
        title: threadmark.isPersonal() ? flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('ffans-threadmarks.forum.threadmark.edit_personal_tooltip')) : flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('ffans-threadmarks.forum.threadmark.edit_discussion_tooltip')),
        "aria-label": threadmark.isPersonal() ? flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('ffans-threadmarks.forum.threadmark.edit_personal_a11y_label', {
          number
        })) : flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('ffans-threadmarks.forum.threadmark.edit_discussion_a11y_label', {
          number
        })),
        onclick: event => {
          event.stopPropagation();
          flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().modal.show(_ManageThreadmarkModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
            discussion: this.attrs.discussion,
            threadmark
          });
        }
      }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_1___default()), {
        name: "icon fas fa-pencil-alt"
      })));
    })));
  }
  threadmarks() {
    const scope = this.attrs.scope ?? 'all';
    return (0,_utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_4__.discussionThreadmarks)(this.attrs.discussion).filter(mark => scope === 'all' || scope === (mark.isPersonal() ? 'personal' : 'discussion'));
  }
  goToThreadmark(threadmark) {
    this.attrs.onNavigate(threadmark);
  }
}
flarum.reg.add('ffans-threadmarks', 'forum/components/ThreadmarkList', ThreadmarkList);

/***/ },

/***/ "./src/forum/components/ThreadmarkOnlyStream.tsx"
/*!*******************************************************!*\
  !*** ./src/forum/components/ThreadmarkOnlyStream.tsx ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThreadmarkOnlyStream)
/* harmony export */ });
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_utils_ScrollListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/utils/ScrollListener */ "flarum/common/utils/ScrollListener");
/* harmony import */ var flarum_common_utils_ScrollListener__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_ScrollListener__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/discussionThreadmarks */ "./src/forum/utils/discussionThreadmarks.ts");
/* harmony import */ var _ThreadmarkBlock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThreadmarkBlock */ "./src/forum/components/ThreadmarkBlock.tsx");
/* harmony import */ var _ThreadmarkTombstone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThreadmarkTombstone */ "./src/forum/components/ThreadmarkTombstone.tsx");






class ThreadmarkOnlyStream extends (flarum_common_Component__WEBPACK_IMPORTED_MODULE_0___default()) {
  loading = true;
  oninit(vnode) {
    super.oninit(vnode);
    this.scrollListener = new (flarum_common_utils_ScrollListener__WEBPACK_IMPORTED_MODULE_1___default())(this.onscroll.bind(this));
    void this.loadPosts();
  }
  view() {
    const threadmarks = this.attrs.stream.threadmarks();

    // Component.element is captured oncreate, so keep the root stable while loading.
    return m("div", {
      className: "PostStream ThreadmarkOnlyStream",
      role: "feed",
      "aria-live": "off",
      "aria-busy": this.loading
    }, threadmarks.map((threadmark, index) => this.viewThreadmark(threadmark, index)));
  }
  oncreate(vnode) {
    super.oncreate(vnode);
    this.triggerScroll();
    setTimeout(() => {
      this.scrollListener.start();
      this.scrollListener.update();
    });
  }
  onupdate(vnode) {
    super.onupdate(vnode);
    this.triggerScroll();
  }
  onremove(vnode) {
    super.onremove(vnode);
    this.scrollListener.stop();
  }
  viewThreadmark(threadmark, index) {
    const marks = (0,_utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_3__.discussionThreadmarks)(this.attrs.stream.discussion).filter(mark => mark.originalPostId() === threadmark.originalPostId());
    if (threadmark.isPostDeleted()) {
      return m("div", {
        className: "ThreadmarkOnlyStream-item",
        "data-threadmark-index": index,
        key: `threadmark-post-${threadmark.originalPostId()}`
      }, marks.map(mark => m(_ThreadmarkTombstone__WEBPACK_IMPORTED_MODULE_5__["default"], {
        key: mark.key(),
        threadmark: mark
      })));
    }
    const post = flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().store.getById('posts', String(threadmark.originalPostId()));
    if (!post) {
      if (!this.loading) return null;

      // Core's PostStream chunk is already loaded when entering this mode.
      const LoadingPost = flarum.reg.get('core', 'forum/components/LoadingPost');
      return m("div", {
        className: "PostStream-item ThreadmarkOnlyStream-item",
        "data-threadmark-index": index,
        key: `threadmark-post-${threadmark.originalPostId()}`,
        "aria-hidden": "true"
      }, m(LoadingPost, null));
    }
    const PostComponent = (flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().postComponents)[post.contentType()];
    if (!PostComponent) return null;
    return m("div", {
      className: "PostStream-item ThreadmarkOnlyStream-item",
      role: "article",
      "data-threadmark-index": index,
      "data-number": post.number(),
      "data-id": post.id(),
      "data-type": post.contentType(),
      key: `threadmark-post-${threadmark.originalPostId()}`
    }, marks.map(mark => m(_ThreadmarkBlock__WEBPACK_IMPORTED_MODULE_4__["default"], {
      key: mark.key(),
      threadmark: mark
    })), m(PostComponent, {
      post: post
    }));
  }
  async loadPosts() {
    const missingIds = this.attrs.stream.threadmarks().filter(threadmark => !threadmark.isPostDeleted()).map(threadmark => String(threadmark.originalPostId())).filter(id => !flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().store.getById('posts', id));
    if (!missingIds.length) {
      this.loading = false;
      m.redraw();
      return;
    }
    try {
      for (let i = 0; i < missingIds.length; i += 20) {
        const ids = missingIds.slice(i, i + 20);
        await flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().store.find('posts', ids);
        m.redraw();
      }
    } finally {
      this.loading = false;
      m.redraw();
    }
  }
  triggerScroll() {
    const stream = this.attrs.stream;
    if (!stream.needsScroll || stream.targetIndex === null || this.loading) {
      return;
    }
    const index = stream.targetIndex;
    const animate = stream.animateScroll;
    stream.needsScroll = false;
    void this.scrollToIndex(index, animate, stream.targetAtTop).then(() => {
      stream.paused = false;
      this.updatePosition();
      stream.forceUpdateScrubber = true;
      m.redraw();
    });
  }
  scrollToIndex(index, animate, atTop) {
    const $item = this.$(`.ThreadmarkOnlyStream-item[data-threadmark-index="${index}"]`);
    if (!$item.length) {
      return Promise.resolve();
    }
    const top = atTop ? 0 : $item.offset().top - this.getMarginTop();
    const $container = $('html, body').stop(true);
    if (!animate) {
      $container.scrollTop(top);
      return Promise.resolve();
    }
    return new Promise(resolve => {
      $container.animate({
        scrollTop: top
      }, 'fast', () => resolve());
    });
  }
  onscroll(top) {
    if (top === void 0) {
      top = window.scrollY;
    }
    if (this.loading || this.attrs.stream.paused) return;
    this.updatePosition(top);
  }
  updatePosition(top) {
    if (top === void 0) {
      top = window.scrollY;
    }
    const stream = this.attrs.stream;
    const marginTop = this.getMarginTop();
    const viewportHeight = $(window).height() - marginTop;
    const viewportTop = top + marginTop;
    const $items = this.$('.ThreadmarkOnlyStream-item[data-threadmark-index]');
    let visible = 0;
    let indexFromViewport = null;
    $items.each(function () {
      const $item = $(this);
      const itemTop = $item.offset().top;
      const height = $item.outerHeight(true);
      if (itemTop + height < viewportTop) {
        return;
      }
      if (itemTop > viewportTop + viewportHeight) {
        return false;
      }
      const visibleTop = Math.max(0, viewportTop - itemTop);
      const visibleBottom = Math.min(height, viewportTop + viewportHeight - itemTop);
      const visibleItem = visibleBottom - visibleTop;
      if (indexFromViewport === null) {
        indexFromViewport = Number($item.data('threadmark-index')) + visibleTop / height;
      }
      if (visibleItem > 0) {
        visible += visibleItem / height;
      }
      return;
    });
    stream.index = indexFromViewport !== null ? indexFromViewport + 1 : stream.count();
    stream.visible = visible;
  }
  getMarginTop() {
    const headerId = flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().screen() === 'phone' ? '#app-navigation' : '#header';
    return $(headerId).outerHeight() + parseInt(this.$().css('margin-top'), 10);
  }
}
flarum.reg.add('ffans-threadmarks', 'forum/components/ThreadmarkOnlyStream', ThreadmarkOnlyStream);

/***/ },

/***/ "./src/forum/components/ThreadmarkScrubberMarkers.tsx"
/*!************************************************************!*\
  !*** ./src/forum/components/ThreadmarkScrubberMarkers.tsx ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThreadmarkScrubberMarkers)
/* harmony export */ });
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/discussionThreadmarks */ "./src/forum/utils/discussionThreadmarks.ts");
/* harmony import */ var _utils_threadmarkDirectory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/threadmarkDirectory */ "./src/forum/utils/threadmarkDirectory.ts");
/* harmony import */ var _utils_threadmarkNavigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/threadmarkNavigation */ "./src/forum/utils/threadmarkNavigation.ts");
/* harmony import */ var _utils_threadmarkTypeLabel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/threadmarkTypeLabel */ "./src/forum/utils/threadmarkTypeLabel.ts");







const CLUSTER_DISTANCE = 12;
class ThreadmarkScrubberMarkers extends (flarum_common_Component__WEBPACK_IMPORTED_MODULE_0___default()) {
  height = 0;
  oncreate(vnode) {
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
  onremove(vnode) {
    super.onremove(vnode);
    this.resizeObserver?.disconnect();
  }
  view() {
    const discussion = this.attrs.discussion;
    const threadmarks = (0,_utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_3__.discussionThreadmarks)(discussion);
    if (!threadmarks.length || !this.height) {
      return m("div", {
        className: "ThreadmarkScrubberMarkers"
      });
    }

    // Match Core's post stream: post numbers can have gaps and discussion counters can be stale.
    const lastIndex = discussion.postIds().length - 1;
    const markers = threadmarks.map(threadmark => {
      // 是否可跳转
      const index = (0,_utils_threadmarkNavigation__WEBPACK_IMPORTED_MODULE_5__.getThreadmarkNavigationIndex)(discussion, threadmark);
      if (index === null) {
        return null;
      }
      const position = lastIndex <= 0 ? 0 : Math.max(0, Math.min(index, lastIndex)) / lastIndex;
      return {
        threadmark,
        position,
        y: position * this.height
      };
    }).filter(marker => marker !== null).sort((a, b) => a.y - b.y);
    const groups = this.groupMarkers(markers);
    return m("div", {
      className: "ThreadmarkScrubberMarkers"
    }, groups.map(group => {
      const position = group.reduce((sum, marker) => sum + marker.position, 0) / group.length;
      if (group.length === 1) {
        const threadmark = group[0].threadmark;
        const type = threadmark.type();
        const note = threadmark.note();
        return m("div", {
          role: "group",
          className: "ThreadmarkScrubberMarker",
          style: {
            top: `${position * 100}%`,
            backgroundColor: type.color(),
            '--threadmark-color': type.color()
          },
          onclick: e => {
            e.stopPropagation();
            this.attrs.onNavigate(threadmark);
          }
        }, m("button", {
          type: "button",
          className: "ThreadmarkScrubberMarker-hit",
          "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_1___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('ffans-threadmarks.forum.scrubber.threadmark_a11y_label', {
            number: threadmark.originalPostNumber()
          }))
        }), this.viewMarkersCollapse(group));
      }
      const threadmark = group[0].threadmark;
      const type = threadmark.type();
      return m("div", {
        role: "group",
        className: "ThreadmarkScrubberMarker ThreadmarkScrubberMarker--cluster",
        style: {
          top: `${position * 100}%`,
          backgroundColor: type.color(),
          '--threadmark-color': type.color()
        },
        onclick: e => {
          e.stopPropagation();
          this.attrs.onNavigate(threadmark);
        }
      }, m("button", {
        type: "button",
        className: "ThreadmarkScrubberMarker-hit",
        "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_1___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('ffans-threadmarks.forum.scrubber.cluster_a11y_label', {
          count: group.length
        }))
      }), m("i", null, group.length), this.viewMarkersCollapse(group));
    }));
  }
  viewMarkersCollapse(group) {
    return m("div", {
      className: "ThreadmarkScrubberMarker-collapse"
    }, m("button", {
      type: "button",
      className: "ThreadmarkScrubberMarker-openDirectory",
      title: flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_1___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('ffans-threadmarks.forum.scrubber.open_directory_a11y_label')),
      "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_1___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('ffans-threadmarks.forum.scrubber.open_directory_a11y_label')),
      onclick: event => {
        event.stopPropagation();
        (0,_utils_threadmarkDirectory__WEBPACK_IMPORTED_MODULE_4__.openThreadmarkDirectory)(this.attrs.discussion.id());
      }
    }, m("i", {
      className: "icon fa-solid fa-up-right-and-down-left-from-center",
      "aria-hidden": "true"
    })), m("ul", {
      className: "ThreadmarkScrubberMarker-collapseList"
    }, group.map(_ref => {
      let {
        threadmark
      } = _ref;
      const type = threadmark.type();
      return m("li", {
        className: "ThreadmarkScrubberMarker-collapseItem",
        style: {
          '--threadmark-color': type.color()
        },
        onclick: e => {
          e.stopPropagation();
          this.attrs.onNavigate(threadmark);
        }
      }, type.icon() && m("i", {
        className: `icon ${type.icon()}`,
        "aria-hidden": "true"
      }), threadmark.note() ? m("span", {
        className: "ThreadmarkScrubberMarker-collapseNote"
      }, threadmark.note()) : m("span", {
        className: "ThreadmarkScrubberMarker-collapseLabel"
      }, (0,_utils_threadmarkTypeLabel__WEBPACK_IMPORTED_MODULE_6__["default"])(type)), threadmark.isPersonal() && m("span", {
        className: "ThreadmarkMineBadge"
      }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('ffans-threadmarks.forum.threadmark.mine_badge')), m("span", {
        className: "ThreadmarkScrubberMarker-collapseNumber"
      }, "#", threadmark.originalPostNumber()));
    })));
  }
  updateHeight() {
    this.height = this.element.clientHeight;
  }

  /**
   * 聚合点
   * 0px, 10px, 20px -> [0, 10], [20]
   */
  groupMarkers(markers) {
    const groups = [];
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
flarum.reg.add('ffans-threadmarks', 'forum/components/ThreadmarkScrubberMarkers', ThreadmarkScrubberMarkers);

/***/ },

/***/ "./src/forum/components/ThreadmarkTombstone.tsx"
/*!******************************************************!*\
  !*** ./src/forum/components/ThreadmarkTombstone.tsx ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThreadmarkTombstone)
/* harmony export */ });
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThreadmarkBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThreadmarkBlock */ "./src/forum/components/ThreadmarkBlock.tsx");



class ThreadmarkTombstone extends (flarum_common_Component__WEBPACK_IMPORTED_MODULE_0___default()) {
  view(vnode) {
    const threadmark = this.attrs.threadmark;
    return m("div", {
      class: "PostStream-item ThreadmarkTombstone",
      "data-threadmark-id": threadmark.key(),
      "data-threadmark-number": threadmark.originalPostNumber()
    }, m(_ThreadmarkBlock__WEBPACK_IMPORTED_MODULE_2__["default"], {
      threadmark: threadmark
    }), m("div", {
      class: "ThreadmarkTombstone-content Post-body"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('ffans-threadmarks.forum.threadmark.deleted_text')));
  }
}
flarum.reg.add('ffans-threadmarks', 'forum/components/ThreadmarkTombstone', ThreadmarkTombstone);

/***/ },

/***/ "./src/forum/extend.ts"
/*!*****************************!*\
  !*** ./src/forum/extend.ts ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extenders */ "flarum/common/extenders");
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/models/Discussion */ "flarum/common/models/Discussion");
/* harmony import */ var flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/models/Post */ "flarum/common/models/Post");
/* harmony import */ var flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/extend */ "./src/common/extend.ts");
/* harmony import */ var _models_Threadmark__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/Threadmark */ "./src/forum/models/Threadmark.ts");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([..._common_extend__WEBPACK_IMPORTED_MODULE_3__["default"], new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Store)().add('threadmarks', _models_Threadmark__WEBPACK_IMPORTED_MODULE_4__["default"]), new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Store)().add('personal-threadmarks', _models_Threadmark__WEBPACK_IMPORTED_MODULE_4__["default"]), new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Model)((flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_1___default())).hasMany('threadmarks').hasMany('personalThreadmarks').attribute('canManageThreadmarks').attribute('canManagePersonalThreadmarks'), new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Model)((flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_2___default())).hasOne('threadmark').hasOne('personalThreadmark')]);

/***/ },

/***/ "./src/forum/extenders/addThreadmarkOnlyMode.tsx"
/*!*******************************************************!*\
  !*** ./src/forum/extenders/addThreadmarkOnlyMode.tsx ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addThreadmarkOnlyMode)
/* harmony export */ });
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/forum/components/DiscussionPage */ "flarum/forum/components/DiscussionPage");
/* harmony import */ var flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_ThreadmarkDirectory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ThreadmarkDirectory */ "./src/forum/components/ThreadmarkDirectory.tsx");
/* harmony import */ var _components_ThreadmarkOnlyStream__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/ThreadmarkOnlyStream */ "./src/forum/components/ThreadmarkOnlyStream.tsx");
/* harmony import */ var _states_ThreadmarkStreamState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../states/ThreadmarkStreamState */ "./src/forum/states/ThreadmarkStreamState.ts");
/* harmony import */ var _utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/discussionThreadmarks */ "./src/forum/utils/discussionThreadmarks.ts");
/* harmony import */ var _utils_threadmarkNavigation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/threadmarkNavigation */ "./src/forum/utils/threadmarkNavigation.ts");
/* harmony import */ var _utils_vnode__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/vnode */ "./src/forum/utils/vnode.ts");











function addThreadmarkOnlyMode() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_4___default().prototype), 'sidebarItems', function (items) {
    const discussion = this.discussion;
    const active = !!flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().current.get('threadmarksOnly');
    if (!discussion || !active && !(0,_utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_8__.discussionThreadmarks)(discussion).length) return;
    const onlyModeControl = m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0___default()), {
      icon: active ? 'fa-solid fa-book-bookmark' : 'fa-solid fa-book-bookmark',
      className: `Button ThreadmarkOnlyButton ${active ? 'active' : ''}`,
      "aria-pressed": active ? 'true' : 'false',
      "aria-label": active ? flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('ffans-threadmarks.forum.discussion_controls.show_all_button_a11y_label')) : flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_2___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('ffans-threadmarks.forum.discussion_controls.show_threadmarks_button_a11y_label')),
      noStyleOverride: true,
      onclick: async () => {
        if (active) {
          const stream = flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().current.get('stream');
          // Core declares near protected; the extension reads its live reading position.
          const number = this['near'] || 1;

          // Only mode leaves the normal page's reading position unchanged.
          // Load that location before mounting Core's stream so it can scroll there.
          await stream.goToNumber(number, true);
          if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().current.get('stream') !== stream) return;
          flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().current.set('threadmarksOnly', false);
          m.redraw();
        } else {
          const header = document.querySelector(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().screen() === 'phone' ? '#app-navigation' : '#header');
          const viewportTop = header?.getBoundingClientRect().bottom ?? 0;
          const visiblePost = Array.from(this.element.querySelectorAll('.DiscussionPage-stream .PostStream-item[data-number], .DiscussionPage-stream .ThreadmarkTombstone[data-threadmark-number]')).find(item => {
            const rect = item.getBoundingClientRect();
            return rect.height > 0 && rect.bottom > viewportTop && rect.top < window.innerHeight;
          });
          const currentNumber = Number(visiblePost?.dataset.number ?? visiblePost?.dataset.threadmarkNumber ?? this['near']) || 1;
          const threadmarkStream = new _states_ThreadmarkStreamState__WEBPACK_IMPORTED_MODULE_7__["default"](discussion);
          flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().current.set('threadmarkStream', threadmarkStream);
          flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().current.set('threadmarksOnly', true);
          void threadmarkStream.goToPostNumber(currentNumber, true);
        }
      }
    }, active ? flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('ffans-threadmarks.forum.discussion_controls.show_all_button') : flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('ffans-threadmarks.forum.discussion_controls.show_threadmarks_button'));
    items.add('threadmarksOnly', m(_components_ThreadmarkDirectory__WEBPACK_IMPORTED_MODULE_5__["default"], {
      discussion: discussion,
      onlyModeControl: onlyModeControl,
      onNavigate: threadmark => _utils_threadmarkNavigation__WEBPACK_IMPORTED_MODULE_9__.navigateToThreadmark.call({
        stream: this.stream,
        updateScrubberValues: () => {
          this.stream.forceUpdateScrubber = true;
          m.redraw();
        }
      }, discussion, threadmark)
    }), 0);
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)('flarum/forum/components/DiscussionPage', 'view', function (view) {
    if (!flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().current.get('threadmarksOnly')) return;
    const threadmarkStream = flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().current.get('threadmarkStream');
    if (!threadmarkStream) return;
    const streamContainer = (0,_utils_vnode__WEBPACK_IMPORTED_MODULE_10__.findVnodeByClass)(view, 'DiscussionPage-stream');
    if (!streamContainer) return;
    streamContainer.children = [m(_components_ThreadmarkOnlyStream__WEBPACK_IMPORTED_MODULE_6__["default"], {
      stream: threadmarkStream
    })];
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)('flarum/forum/components/PostStream', 'oncreate', function () {
    if (!flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().current.get('threadmarksOnly') && flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().current.get('threadmarkStream')) {
      // Recalculate the normal stream's viewport after its DOM is restored.
      this.updateScrubber();
    }
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.override)('flarum/forum/components/PostStreamScrubber', 'view', function (original) {
    const threadmarkStream = flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().current.get('threadmarkStream');
    const stream = flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().current.get('threadmarksOnly') && threadmarkStream ? threadmarkStream : this.attrs.stream;
    if (this.stream !== stream) {
      this.stream = stream;
      // Core updates the handle's inline heights outside of the Mithril view.
      stream.forceUpdateScrubber = true;
    }
    return original();
  });
}
flarum.reg.add('ffans-threadmarks', 'forum/extenders/addThreadmarkOnlyMode', addThreadmarkOnlyMode);

/***/ },

/***/ "./src/forum/extenders/addThreadmarkPostBlock.tsx"
/*!********************************************************!*\
  !*** ./src/forum/extenders/addThreadmarkPostBlock.tsx ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addThreadmarkPostBlock)
/* harmony export */ });
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ThreadmarkBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ThreadmarkBlock */ "./src/forum/components/ThreadmarkBlock.tsx");
/* harmony import */ var _utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/discussionThreadmarks */ "./src/forum/utils/discussionThreadmarks.ts");




function addThreadmarkPostBlock() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__.override)('flarum/forum/components/PostType', 'view', function (original) {
    const content = original();
    const threadmarks = (0,_utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_3__.postThreadmarks)(this.attrs.post);
    if (!threadmarks.length || flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().current.get('threadmarksOnly')) {
      return content;
    }
    return [...threadmarks.map(mark => m(_components_ThreadmarkBlock__WEBPACK_IMPORTED_MODULE_2__["default"], {
      threadmark: mark
    })), content];
  });
}
flarum.reg.add('ffans-threadmarks', 'forum/extenders/addThreadmarkPostBlock', addThreadmarkPostBlock);

/***/ },

/***/ "./src/forum/extenders/addThreadmarkPostControl.tsx"
/*!**********************************************************!*\
  !*** ./src/forum/extenders/addThreadmarkPostControl.tsx ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addThreadmarkPostControl)
/* harmony export */ });
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_utils_PostControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/utils/PostControls */ "flarum/forum/utils/PostControls");
/* harmony import */ var flarum_forum_utils_PostControls__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_utils_PostControls__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_ManageThreadmarkModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ManageThreadmarkModal */ "./src/forum/components/ManageThreadmarkModal.tsx");





function addThreadmarkPostControl() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_utils_PostControls__WEBPACK_IMPORTED_MODULE_3___default()), 'moderationControls', function (items, post) {
    const discussion = post.discussion();
    if (!discussion || post.number() === 1 || post.contentType() !== 'comment' || post.isHidden()) return;
    if (!discussion.canManagePersonalThreadmarks() && !discussion.canManageThreadmarks()) return;
    items.add('threadmark', m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0___default()), {
      icon: "fas fa-bookmark",
      onclick: () => flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().modal.show(_components_ManageThreadmarkModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
        discussion,
        post
      })
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('ffans-threadmarks.forum.post_controls.manage_button')));
  });
}
flarum.reg.add('ffans-threadmarks', 'forum/extenders/addThreadmarkPostControl', addThreadmarkPostControl);

/***/ },

/***/ "./src/forum/extenders/addThreadmarkPostFlash.ts"
/*!*******************************************************!*\
  !*** ./src/forum/extenders/addThreadmarkPostFlash.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addThreadmarkPostFlash)
/* harmony export */ });
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__);

function addThreadmarkPostFlash() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__.override)('flarum/forum/components/PostStream', 'scrollToItem', function (original, $item, animate, force, reply) {
    const index = $item.data('index');
    const result = original($item, animate, force, reply);
    if (reply || this.stream.threadmarkFlashIndex !== index) {
      return result;
    }
    return Promise.resolve(result).then(() => {
      // 防止点击一个跳转完成前又点一次
      if (this.stream.threadmarkFlashIndex !== index) {
        return;
      }
      const target = this.$(`.PostStream-item[data-index="${index}"]`);
      this.flashItem(target);
      delete this.stream.threadmarkFlashIndex;
    });
  });
}
flarum.reg.add('ffans-threadmarks', 'forum/extenders/addThreadmarkPostFlash', addThreadmarkPostFlash);

/***/ },

/***/ "./src/forum/extenders/addThreadmarkScrubberMarkers.tsx"
/*!**************************************************************!*\
  !*** ./src/forum/extenders/addThreadmarkScrubberMarkers.tsx ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addThreadmarkScrubberMarkers)
/* harmony export */ });
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ThreadmarkScrubberMarkers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ThreadmarkScrubberMarkers */ "./src/forum/components/ThreadmarkScrubberMarkers.tsx");
/* harmony import */ var _utils_threadmarkNavigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/threadmarkNavigation */ "./src/forum/utils/threadmarkNavigation.ts");
/* harmony import */ var _utils_vnode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/vnode */ "./src/forum/utils/vnode.ts");





function addThreadmarkScrubberMarkers() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__.extend)('flarum/forum/components/PostStreamScrubber', 'view', function (view) {
    if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().current.get('threadmarksOnly')) return;
    const discussion = this.stream.discussion;

    // scrollbar markers
    const scrollbar = (0,_utils_vnode__WEBPACK_IMPORTED_MODULE_4__.findVnodeByClass)(view, 'Scrubber-scrollbar');
    if (scrollbar && Array.isArray(scrollbar.children)) {
      scrollbar.children.push(m(_components_ThreadmarkScrubberMarkers__WEBPACK_IMPORTED_MODULE_2__["default"], {
        discussion: discussion,
        onNavigate: _utils_threadmarkNavigation__WEBPACK_IMPORTED_MODULE_3__.navigateToThreadmark.bind(this, discussion)
      }));
    }
  });
}
flarum.reg.add('ffans-threadmarks', 'forum/extenders/addThreadmarkScrubberMarkers', addThreadmarkScrubberMarkers);

/***/ },

/***/ "./src/forum/extenders/addThreadmarkTombstones.tsx"
/*!*********************************************************!*\
  !*** ./src/forum/extenders/addThreadmarkTombstones.tsx ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addThreadmarkTombstones)
/* harmony export */ });
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_ThreadmarkTombstone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/ThreadmarkTombstone */ "./src/forum/components/ThreadmarkTombstone.tsx");
/* harmony import */ var _utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/discussionThreadmarks */ "./src/forum/utils/discussionThreadmarks.ts");



function addThreadmarkTombstones() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__.extend)('flarum/forum/components/PostStream', 'view', function (view) {
    const threadmarks = (0,_utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_2__.discussionThreadmarks)(this.discussion);
    const deletedThreadmarks = threadmarks.filter(threadmark => threadmark.isPostDeleted()).sort((a, b) => a.originalPostNumber() - b.originalPostNumber());
    if (!deletedThreadmarks.length) return;
    const posts = collectRenderedPosts(view).sort((a, b) => a.number - b.number);
    if (!posts.length) return;

    // key 是 Stone 后面的真实 Post。
    const beforeGroups = new Map();

    // 讨论末尾的 Stone 没有后一条真实 Post。
    const tail = [];
    for (const threadmark of deletedThreadmarks) {
      const number = threadmark.originalPostNumber();
      let previous;
      let next;
      let realPostStillExists = false;
      for (const post of posts) {
        if (post.number === number) {
          realPostStillExists = true;
          break;
        }
        if (post.number < number) {
          previous = post;
          continue;
        }
        if (post.number > number) {
          next = post;
          break;
        }
      }
      if (realPostStillExists) continue;
      if (next) {
        // 正常情况：
        //
        // #1
        // Stone #2
        // Stone #3
        // Stone #4
        // #5
        //
        // 至少要确认 Stone 的前一侧也属于当前窗口。如果已经在讨论开头，则允许没有 previous。
        if (previous || this.stream.visibleStart === 0) {
          const group = beforeGroups.get(next) ?? [];
          group.push(threadmark);
          beforeGroups.set(next, group);
        }
        continue;
      }

      // 没有 next，只有在当前已经看到讨论末尾时，才能确定 Stone 应该放到最后一条真实 Post 后面。
      if (previous && this.stream.viewingEnd()) {
        tail.push(threadmark);
      }
    }
    for (const [target, group] of beforeGroups) {
      const index = target.parent.indexOf(target.vnode);
      if (index === -1) continue;
      target.parent.splice(index, 0, ...group.map(threadmark => m(_components_ThreadmarkTombstone__WEBPACK_IMPORTED_MODULE_1__["default"], {
        key: threadmark.key(),
        threadmark: threadmark
      })));
    }
    if (tail.length) {
      const lastPost = posts[posts.length - 1];
      const index = lastPost.parent.indexOf(lastPost.vnode);
      if (index !== -1) {
        lastPost.parent.splice(index + 1, 0, ...tail.map(threadmark => m(_components_ThreadmarkTombstone__WEBPACK_IMPORTED_MODULE_1__["default"], {
          key: threadmark.key(),
          threadmark: threadmark
        })));
      }
    }
  });
}
function collectRenderedPosts(node, result) {
  if (result === void 0) {
    result = [];
  }
  if (Array.isArray(node)) {
    for (const child of node) {
      if (isNumberedPostStreamItem(child)) {
        result.push({
          vnode: child,
          parent: node,
          number: Number(child.attrs['data-number'])
        });
      }
      collectRenderedPosts(child, result);
    }
    return result;
  }
  if (!node || typeof node !== 'object' || !('children' in node)) {
    return result;
  }
  collectRenderedPosts(node.children, result);
  return result;
}
function isNumberedPostStreamItem(node) {
  if (!node || typeof node !== 'object' || !('attrs' in node)) {
    return false;
  }
  const vnode = node;
  const className = vnode.attrs?.className;
  return typeof className === 'string' && className.split(/\s+/).includes('PostStream-item') && vnode.attrs?.['data-number'] !== undefined;
}
flarum.reg.add('ffans-threadmarks', 'forum/extenders/addThreadmarkTombstones', addThreadmarkTombstones);

/***/ },

/***/ "./src/forum/extenders/syncThreadmarkAfterPostDelete.ts"
/*!**************************************************************!*\
  !*** ./src/forum/extenders/syncThreadmarkAfterPostDelete.ts ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ syncThreadmarkAfterPostDelete)
/* harmony export */ });
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/models/Post */ "flarum/common/models/Post");
/* harmony import */ var flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/discussionThreadmarks */ "./src/forum/utils/discussionThreadmarks.ts");




function syncThreadmarkAfterPostDelete() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__.override)((flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_1___default().prototype), 'delete', function (original, body, options) {
    const discussion = this.discussion();
    const threadmarks = discussion && (0,_utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_3__.discussionThreadmarks)(discussion);

    // 当前 Discussion 没有 Threadmark，就没必要额外请求。
    if (!threadmarks || !threadmarks.length) {
      return original(body, options);
    }

    // 如果这是最后一条 Post，Discussion 本身也可能随之消失，Threadmark 会跟着 Discussion 一并清理，不需要刷新。
    const shouldRefresh = discussion.postIds().length > 1;
    return original(body, options).then(() => {
      if (!shouldRefresh || !discussion.id()) {
        return;
      }
      return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().store.find('discussions', discussion.id(), {
        include: 'threadmarks,threadmarks.type,personalThreadmarks,personalThreadmarks.type'
      }).then(() => undefined).catch(() => {
        // Post 删除本身已经成功。如果 Discussion 同时被删除或刷新失败，不应该把成功的 DELETE 重新变成一个前端错误。
      });
    });
  });
}
flarum.reg.add('ffans-threadmarks', 'forum/extenders/syncThreadmarkAfterPostDelete', syncThreadmarkAfterPostDelete);

/***/ },

/***/ "./src/forum/index.ts"
/*!****************************!*\
  !*** ./src/forum/index.ts ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extend: () => (/* reexport safe */ _extend__WEBPACK_IMPORTED_MODULE_9__["default"])
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _extenders_addThreadmarkOnlyMode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extenders/addThreadmarkOnlyMode */ "./src/forum/extenders/addThreadmarkOnlyMode.tsx");
/* harmony import */ var _extenders_addThreadmarkPostBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extenders/addThreadmarkPostBlock */ "./src/forum/extenders/addThreadmarkPostBlock.tsx");
/* harmony import */ var _extenders_addThreadmarkPostControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extenders/addThreadmarkPostControl */ "./src/forum/extenders/addThreadmarkPostControl.tsx");
/* harmony import */ var _extenders_addThreadmarkPostFlash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./extenders/addThreadmarkPostFlash */ "./src/forum/extenders/addThreadmarkPostFlash.ts");
/* harmony import */ var _extenders_addThreadmarkScrubberMarkers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./extenders/addThreadmarkScrubberMarkers */ "./src/forum/extenders/addThreadmarkScrubberMarkers.tsx");
/* harmony import */ var _extenders_addThreadmarkTombstones__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./extenders/addThreadmarkTombstones */ "./src/forum/extenders/addThreadmarkTombstones.tsx");
/* harmony import */ var _extenders_syncThreadmarkAfterPostDelete__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./extenders/syncThreadmarkAfterPostDelete */ "./src/forum/extenders/syncThreadmarkAfterPostDelete.ts");
/* harmony import */ var _states_ThreadmarkTypeListState__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./states/ThreadmarkTypeListState */ "./src/forum/states/ThreadmarkTypeListState.ts");
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./extend */ "./src/forum/extend.ts");










flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('ffans-threadmarks', () => {
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().threadmarkTypeList) = new _states_ThreadmarkTypeListState__WEBPACK_IMPORTED_MODULE_8__["default"]();
  (0,_extenders_addThreadmarkPostControl__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_extenders_addThreadmarkPostBlock__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_extenders_addThreadmarkScrubberMarkers__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_extenders_addThreadmarkPostFlash__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_extenders_addThreadmarkTombstones__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_extenders_syncThreadmarkAfterPostDelete__WEBPACK_IMPORTED_MODULE_7__["default"])();
  (0,_extenders_addThreadmarkOnlyMode__WEBPACK_IMPORTED_MODULE_1__["default"])();
});

/***/ },

/***/ "./src/forum/models/Threadmark.ts"
/*!****************************************!*\
  !*** ./src/forum/models/Threadmark.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Threadmark)
/* harmony export */ });
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_0__);

class Threadmark extends (flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default()) {
  discussion = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().hasOne('discussion'))();
  post = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().hasOne('post').call(this))();
  originalPostId = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().attribute('originalPostId'))();
  originalPostNumber = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().attribute('originalPostNumber'))();
  type = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().hasOne('type'))();
  note = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().attribute('note'))();
  isPostDeleted = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().attribute('isPostDeleted'))();
  navigationIndex = (() => flarum_common_Model__WEBPACK_IMPORTED_MODULE_0___default().attribute('navigationIndex'))();
  isPersonal() {
    return this.data.type === 'personal-threadmarks';
  }
  key() {
    return `${this.data.type}-${this.id()}`;
  }
  canEdit() {
    const discussion = this.discussion();
    return this.isPersonal() ? !!this.attribute('canManage') : !!discussion && discussion.canManageThreadmarks();
  }
}
flarum.reg.add('ffans-threadmarks', 'forum/models/Threadmark', Threadmark);

/***/ },

/***/ "./src/forum/states/ThreadmarkStreamState.ts"
/*!***************************************************!*\
  !*** ./src/forum/states/ThreadmarkStreamState.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThreadmarkStreamState)
/* harmony export */ });
/* harmony import */ var _utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/discussionThreadmarks */ "./src/forum/utils/discussionThreadmarks.ts");

class ThreadmarkStreamState {
  index = 1;
  visible = 1;
  paused = false;
  description = '';
  forceUpdateScrubber = false;
  loadPromise = (() => Promise.resolve())();
  needsScroll = false;
  targetIndex = null;
  targetAtTop = false;
  animateScroll = false;
  constructor(discussion) {
    this.discussion = discussion;
  }
  threadmarks() {
    const seen = new Set();
    return (0,_utils_discussionThreadmarks__WEBPACK_IMPORTED_MODULE_0__.discussionThreadmarks)(this.discussion).filter(mark => {
      const id = mark.originalPostId();
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }
  count() {
    return this.threadmarks().length;
  }
  disabled() {
    return this.visible >= this.count();
  }
  sanitizeIndex(index) {
    return Math.max(0, Math.min(this.count(), Math.floor(index)));
  }
  goToFirst() {
    return this.goToIndex(0);
  }
  goToLast() {
    return this.goToIndex(this.count() - 1);
  }
  goToPostNumber(number, noAnimation) {
    if (noAnimation === void 0) {
      noAnimation = false;
    }
    const threadmarks = this.threadmarks();
    const nextIndex = threadmarks.findIndex(threadmark => threadmark.originalPostNumber() > number);
    const index = nextIndex === -1 ? threadmarks.length - 1 : Math.max(0, nextIndex - 1);
    return this.goToIndex(index, noAnimation, nextIndex === 0);
  }
  goToIndex(index, noAnimation, atTop) {
    if (noAnimation === void 0) {
      noAnimation = false;
    }
    if (atTop === void 0) {
      atTop = index === 0;
    }
    const count = this.count();
    if (!count) {
      return Promise.resolve();
    }
    const targetIndex = Math.max(0, Math.min(count - 1, Math.floor(index)));
    this.paused = true;
    this.targetIndex = targetIndex;
    this.targetAtTop = atTop;
    this.needsScroll = true;
    this.animateScroll = !noAnimation;

    // Scrubber settled position is 1-based.
    this.index = targetIndex + 1;
    this.forceUpdateScrubber = true;
    this.loadPromise = Promise.resolve();
    m.redraw();
    return this.loadPromise;
  }
  current() {
    return this.threadmarks()[Math.max(0, Math.floor(this.index) - 1)];
  }
}
flarum.reg.add('ffans-threadmarks', 'forum/states/ThreadmarkStreamState', ThreadmarkStreamState);

/***/ },

/***/ "./src/forum/states/ThreadmarkTypeListState.ts"
/*!*****************************************************!*\
  !*** ./src/forum/states/ThreadmarkTypeListState.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThreadmarkTypeListState)
/* harmony export */ });
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_0__);

class ThreadmarkTypeListState {
  loaded = false;
  all() {
    return flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default().store.all('threadmark-types');
  }
  load() {
    if (this.loaded) return Promise.resolve(this.all());
    return this.loadingPromise ??= flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default().store.find('threadmark-types').then(() => {
      this.loaded = true;
      return this.all();
    }).finally(() => {
      this.loadingPromise = undefined;
    });
  }
}
flarum.reg.add('ffans-threadmarks', 'forum/states/ThreadmarkTypeListState', ThreadmarkTypeListState);

/***/ },

/***/ "./src/forum/utils/discussionThreadmarks.ts"
/*!**************************************************!*\
  !*** ./src/forum/utils/discussionThreadmarks.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   discussionThreadmarks: () => (/* binding */ discussionThreadmarks),
/* harmony export */   postThreadmarks: () => (/* binding */ postThreadmarks)
/* harmony export */ });
function discussionThreadmarks(discussion) {
  return [...(discussion.threadmarks() || []), ...(discussion.personalThreadmarks() || [])].filter(mark => !!mark).sort((a, b) => a.originalPostNumber() - b.originalPostNumber() || Number(a.isPersonal()) - Number(b.isPersonal()) || Number(a.id()) - Number(b.id()));
}
function postThreadmarks(post) {
  const discussion = post.discussion();
  if (discussion) {
    return discussionThreadmarks(discussion).filter(mark => mark.originalPostId() === Number(post.id()));
  }
  return [post.threadmark(), post.personalThreadmark()].filter(mark => !!mark);
}
flarum.reg.add('ffans-threadmarks', 'forum/utils/discussionThreadmarks', { discussionThreadmarks: discussionThreadmarks,postThreadmarks: postThreadmarks, });

/***/ },

/***/ "./src/forum/utils/threadmarkDirectory.ts"
/*!************************************************!*\
  !*** ./src/forum/utils/threadmarkDirectory.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DIRECTORY_OPEN_EVENT: () => (/* binding */ DIRECTORY_OPEN_EVENT),
/* harmony export */   openThreadmarkDirectory: () => (/* binding */ openThreadmarkDirectory)
/* harmony export */ });
const DIRECTORY_OPEN_EVENT = 'ffans-threadmarks:open-directory';
function openThreadmarkDirectory(discussionId) {
  window.dispatchEvent(new CustomEvent(DIRECTORY_OPEN_EVENT, {
    detail: discussionId
  }));
}
flarum.reg.add('ffans-threadmarks', 'forum/utils/threadmarkDirectory', { DIRECTORY_OPEN_EVENT: DIRECTORY_OPEN_EVENT,openThreadmarkDirectory: openThreadmarkDirectory, });

/***/ },

/***/ "./src/forum/utils/threadmarkNavigation.ts"
/*!*************************************************!*\
  !*** ./src/forum/utils/threadmarkNavigation.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getThreadmarkNavigationIndex: () => (/* binding */ getThreadmarkNavigationIndex),
/* harmony export */   navigateToThreadmark: () => (/* binding */ navigateToThreadmark)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);

function getThreadmarkNavigationIndex(discussion, threadmark) {
  const index = discussion.postIds().indexOf(String(threadmark.originalPostId()));
  if (index !== -1) {
    return index;
  }
  if (threadmark.isPostDeleted()) {
    return threadmark.navigationIndex() ?? null;
  }
  return null;
}
async function navigateToThreadmark(discussion, threadmark) {
  const personalStream = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().current.get('threadmarkStream');
  if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().current.get('threadmarksOnly') && personalStream) {
    return personalStream.goToPostNumber(threadmark.originalPostNumber());
  }
  const index = getThreadmarkNavigationIndex(discussion, threadmark);
  if (index === null) return;
  if (!threadmark.isPostDeleted()) {
    const promise = this.stream.goToIndex(index);
    this.updateScrubberValues({
      animate: true,
      forceHeightChange: true
    });
    this.stream.threadmarkFlashIndex = index;
    return promise;
  }
  const findTarget = () => document.querySelector(`.ThreadmarkTombstone[data-threadmark-id="${threadmark.key()}"]`);
  let target = findTarget();

  // Load missing posts without scheduling Core's separate scroll to the anchor post.
  if (!target) {
    this.stream.paused = true;
    try {
      await this.stream.loadNearIndex(index);
      m.redraw.sync();
      target = findTarget();
    } finally {
      this.stream.paused = false;
    }
  }
  if (!target) return;
  const header = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().screen() === 'phone' ? document.querySelector('#app-navigation') : document.querySelector('#header');
  const marginTop = header?.offsetHeight ?? 0;
  const top = target.getBoundingClientRect().top + window.scrollY - marginTop;
  const $container = $('html, body').stop(true);
  $container.animate({
    scrollTop: top
  }, 'fast');
  await $container.promise();
  this.updateScrubberValues({
    animate: true,
    forceHeightChange: true
  });
  target.classList.remove('fadeIn', 'flash');
  void target.offsetWidth;
  target.classList.add('flash');
  const flashedTarget = target;
  target.addEventListener('animationend', () => flashedTarget.classList.remove('flash'), {
    once: true
  });
}
flarum.reg.add('ffans-threadmarks', 'forum/utils/threadmarkNavigation', { getThreadmarkNavigationIndex: getThreadmarkNavigationIndex, });

/***/ },

/***/ "./src/forum/utils/threadmarkTypeLabel.ts"
/*!************************************************!*\
  !*** ./src/forum/utils/threadmarkTypeLabel.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ threadmarkTypeLabel)
/* harmony export */ });
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);


const builtinNames = {
  default: 'Threadmark',
  notice: 'Notice',
  highlight: 'Highlight',
  progress: 'Progress',
  update: 'Update',
  chapter: 'Chapter'
};
function threadmarkTypeLabel(type) {
  const name = type.name();

  // Keep administrator overrides and custom types verbatim.
  if (!type.isBuiltin() || builtinNames[type.key()] !== name) return name;
  const key = `ffans-threadmarks.forum.type_labels.${type.key()}`;
  const label = flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_0___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans(key));
  return label === key ? name : label;
}
flarum.reg.add('ffans-threadmarks', 'forum/utils/threadmarkTypeLabel', threadmarkTypeLabel);

/***/ },

/***/ "./src/forum/utils/vnode.ts"
/*!**********************************!*\
  !*** ./src/forum/utils/vnode.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findVnodeByClass: () => (/* binding */ findVnodeByClass)
/* harmony export */ });
function findVnodeByClass(node, className) {
  if (Array.isArray(node)) {
    for (const child of node) {
      const result = findVnodeByClass(child, className);
      if (result) {
        return result;
      }
    }
    return null;
  }
  if (!node || typeof node !== 'object' || !('attrs' in node)) {
    return null;
  }
  const vnode = node;
  const classes = vnode.attrs?.className;
  if (typeof classes === 'string' && classes.split(/\s+/).includes(className)) {
    return vnode;
  }
  return findVnodeByClass(vnode.children, className);
}
flarum.reg.add('ffans-threadmarks', 'forum/utils/vnode', { findVnodeByClass: findVnodeByClass, });

/***/ },

/***/ "flarum/common/Component"
/*!*************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/Component')" ***!
  \*************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/Component');

/***/ },

/***/ "flarum/common/Model"
/*!*********************************************************!*\
  !*** external "flarum.reg.get('core', 'common/Model')" ***!
  \*********************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/Model');

/***/ },

/***/ "flarum/common/app"
/*!*******************************************************!*\
  !*** external "flarum.reg.get('core', 'common/app')" ***!
  \*******************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/app');

/***/ },

/***/ "flarum/common/components/Button"
/*!*********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Button')" ***!
  \*********************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Button');

/***/ },

/***/ "flarum/common/components/Form"
/*!*******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Form')" ***!
  \*******************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Form');

/***/ },

/***/ "flarum/common/components/FormModal"
/*!************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/FormModal')" ***!
  \************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/FormModal');

/***/ },

/***/ "flarum/common/components/Icon"
/*!*******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Icon')" ***!
  \*******************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Icon');

/***/ },

/***/ "flarum/common/components/Select"
/*!*********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Select')" ***!
  \*********************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Select');

/***/ },

/***/ "flarum/common/extend"
/*!**********************************************************!*\
  !*** external "flarum.reg.get('core', 'common/extend')" ***!
  \**********************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/extend');

/***/ },

/***/ "flarum/common/extenders"
/*!*************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/extenders')" ***!
  \*************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/extenders');

/***/ },

/***/ "flarum/common/models/Discussion"
/*!*********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/models/Discussion')" ***!
  \*********************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/models/Discussion');

/***/ },

/***/ "flarum/common/models/Post"
/*!***************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/models/Post')" ***!
  \***************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/models/Post');

/***/ },

/***/ "flarum/common/utils/ScrollListener"
/*!************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/ScrollListener')" ***!
  \************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/ScrollListener');

/***/ },

/***/ "flarum/common/utils/Stream"
/*!****************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/Stream')" ***!
  \****************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/Stream');

/***/ },

/***/ "flarum/common/utils/extractText"
/*!*********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/extractText')" ***!
  \*********************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/extractText');

/***/ },

/***/ "flarum/forum/app"
/*!******************************************************!*\
  !*** external "flarum.reg.get('core', 'forum/app')" ***!
  \******************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'forum/app');

/***/ },

/***/ "flarum/forum/components/DiscussionPage"
/*!****************************************************************************!*\
  !*** external "flarum.reg.get('core', 'forum/components/DiscussionPage')" ***!
  \****************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'forum/components/DiscussionPage');

/***/ },

/***/ "flarum/forum/utils/PostControls"
/*!*********************************************************************!*\
  !*** external "flarum.reg.get('core', 'forum/utils/PostControls')" ***!
  \*********************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'forum/utils/PostControls');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		flarum.reg._webpack_runtimes["ffans-threadmarks"] ||= __webpack_require__;// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extend: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_1__.extend)
/* harmony export */ });
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.ts");
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.ts");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map