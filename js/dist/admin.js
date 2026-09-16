/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/components/CreateThreadmarkTypeModal.tsx"
/*!************************************************************!*\
  !*** ./src/admin/components/CreateThreadmarkTypeModal.tsx ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateThreadmarkTypeModal)
/* harmony export */ });
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_ColorPreviewInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/ColorPreviewInput */ "flarum/common/components/ColorPreviewInput");
/* harmony import */ var flarum_common_components_ColorPreviewInput__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_ColorPreviewInput__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Form */ "flarum/common/components/Form");
/* harmony import */ var flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/FormModal */ "flarum/common/components/FormModal");
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Icon */ "flarum/common/components/Icon");
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/utils/Stream */ "flarum/common/utils/Stream");
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7__);








class CreateThreadmarkTypeModal extends (flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_4___default()) {
  oninit(vnode) {
    super.oninit(vnode);
    this.key = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default()('');
    this.name = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default()('');
    this.color = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default()('');
    this.icon = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default()('');
  }
  className() {
    return 'CreateThreadmarkTypeModal Modal--small';
  }
  title() {
    return flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.create_type_modal.title');
  }
  content() {
    return m("div", {
      className: "Modal-body"
    }, m((flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_3___default()), null, m("div", {
      className: "Form-group"
    }, m("label", {
      for: "create-threadmark-type-key"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.lib.type_form.key_label')), m("input", {
      id: "create-threadmark-type-key",
      className: "FormControl",
      type: "text",
      name: "key",
      bidi: this.key,
      disabled: this.loading,
      required: true
    })), m("div", {
      className: "Form-group"
    }, m("label", {
      for: "create-threadmark-type-name"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.lib.type_form.name_label')), m("input", {
      id: "create-threadmark-type-name",
      className: "FormControl",
      type: "text",
      name: "name",
      bidi: this.name,
      disabled: this.loading,
      required: true
    })), m("div", {
      className: "Form-group"
    }, m("label", {
      for: "create-threadmark-type-color"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.lib.type_form.color_label')), m((flarum_common_components_ColorPreviewInput__WEBPACK_IMPORTED_MODULE_2___default()), {
      id: "create-threadmark-type-color",
      name: "color",
      bidi: this.color,
      disabled: this.loading,
      required: true,
      "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.lib.type_form.color_label'))
    })), m("div", {
      className: "Form-group"
    }, m("label", {
      for: "create-threadmark-type-icon"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.lib.type_form.icon_label')), m("div", {
      className: "ThreadmarkTypeIconInput"
    }, m("span", {
      className: "ThreadmarkTypeIconInput-preview",
      "aria-hidden": "true",
      style: {
        color: this.color()
      }
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default()), {
      name: this.icon().trim() || 'fas fa-bookmark'
    })), m("input", {
      id: "create-threadmark-type-icon",
      className: "FormControl",
      type: "text",
      name: "icon",
      bidi: this.icon,
      disabled: this.loading,
      required: true,
      placeholder: flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.lib.type_form.icon_placeholder'))
    }))), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1___default()), {
      className: "Button Button--primary Button--block",
      type: "submit",
      loading: this.loading
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.create_type_modal.submit_button')))));
  }
  onsubmit(e) {
    e.preventDefault();
    this.loading = true;
    flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().store.createRecord('threadmark-types').save({
      key: this.key().trim(),
      name: this.name().trim(),
      color: this.color().trim(),
      icon: this.icon().trim()
    }, {
      errorHandler: this.onerror.bind(this)
    }).then(type => {
      this.attrs.onCreated?.(type);
      this.alertAttrs = null;
      this.hide();
    }).finally(() => {
      this.loaded();
    });
  }
}
flarum.reg.add('ffans-threadmarks', 'admin/components/CreateThreadmarkTypeModal', CreateThreadmarkTypeModal);

/***/ },

/***/ "./src/admin/components/EditThreadmarkTypeModal.tsx"
/*!**********************************************************!*\
  !*** ./src/admin/components/EditThreadmarkTypeModal.tsx ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditThreadmarkTypeModal)
/* harmony export */ });
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_ColorPreviewInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/ColorPreviewInput */ "flarum/common/components/ColorPreviewInput");
/* harmony import */ var flarum_common_components_ColorPreviewInput__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_ColorPreviewInput__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Form */ "flarum/common/components/Form");
/* harmony import */ var flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/FormModal */ "flarum/common/components/FormModal");
/* harmony import */ var flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Icon */ "flarum/common/components/Icon");
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/utils/Stream */ "flarum/common/utils/Stream");
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7__);








class EditThreadmarkTypeModal extends (flarum_common_components_FormModal__WEBPACK_IMPORTED_MODULE_4___default()) {
  deleting = false;
  oninit(vnode) {
    super.oninit(vnode);
    this.threadmarkType = this.attrs.threadmarkType;
    this.name = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default()(this.attrs.threadmarkType.name() || '');
    this.color = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default()(this.attrs.threadmarkType.color() || '');
    this.icon = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_7___default()(this.attrs.threadmarkType.icon() || '');
  }
  className() {
    return 'EditThreadmarkTypeModal Modal--small';
  }
  title() {
    return flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.edit_type_modal.title');
  }
  content() {
    return m("div", {
      className: "Modal-body"
    }, m((flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_3___default()), null, m("div", {
      className: "Form-group"
    }, m("label", {
      for: "edit-threadmark-type-key"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.lib.type_form.key_label')), m("input", {
      id: "edit-threadmark-type-key",
      className: "FormControl",
      value: this.threadmarkType.key(),
      disabled: true
    })), m("div", {
      className: "Form-group"
    }, m("label", {
      for: "edit-threadmark-type-name"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.lib.type_form.name_label')), m("input", {
      id: "edit-threadmark-type-name",
      className: "FormControl",
      type: "text",
      name: "name",
      bidi: this.name,
      disabled: this.loading,
      required: true
    })), m("div", {
      className: "Form-group"
    }, m("label", {
      for: "edit-threadmark-type-color"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.lib.type_form.color_label')), m((flarum_common_components_ColorPreviewInput__WEBPACK_IMPORTED_MODULE_2___default()), {
      id: "edit-threadmark-type-color",
      name: "color",
      bidi: this.color,
      disabled: this.loading,
      required: true,
      "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.lib.type_form.color_label'))
    })), m("div", {
      className: "Form-group"
    }, m("label", {
      for: "edit-threadmark-type-icon"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.lib.type_form.icon_label')), m("div", {
      className: "ThreadmarkTypeIconInput"
    }, m("span", {
      className: "ThreadmarkTypeIconInput-preview",
      "aria-hidden": "true",
      style: {
        color: this.color()
      }
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_5___default()), {
      name: this.icon().trim() || 'fas fa-bookmark'
    })), m("input", {
      id: "edit-threadmark-type-icon",
      className: "FormControl",
      type: "text",
      name: "icon",
      bidi: this.icon,
      disabled: this.loading,
      required: true,
      placeholder: flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.lib.type_form.icon_placeholder'))
    }))), m("div", {
      className: "Form-group Form-controls"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1___default()), {
      className: "Button Button--primary",
      type: "submit",
      loading: this.loading && !this.deleting,
      disabled: this.loading
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.edit_type_modal.submit_button')), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1___default()), {
      className: "Button Button--danger EditThreadmarkTypeModal-delete",
      type: "button",
      icon: "fas fa-trash-alt",
      loading: this.deleting,
      disabled: this.loading || this.threadmarkType.canDelete() === false,
      "aria-describedby": this.threadmarkType.canDelete() === false ? 'threadmark-type-delete-reason' : undefined,
      onclick: this.deleteThreadmarkType.bind(this)
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.edit_type_modal.delete_button'))), this.threadmarkType.canDelete() === false && m("p", {
      className: "helpText EditThreadmarkTypeModal-deleteReason",
      id: "threadmark-type-delete-reason"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.lib.validation.type_in_use'))));
  }
  onsubmit(e) {
    e.preventDefault();
    if (this.loading) return;
    this.loading = true;
    this.threadmarkType.save({
      name: this.name().trim(),
      color: this.color().trim(),
      icon: this.icon().trim()
    }, {
      errorHandler: this.onerror.bind(this)
    }).then(this.hide.bind(this)).catch(() => {
      this.loading = false;
      m.redraw();
    });
  }
  deleteThreadmarkType() {
    if (this.loading || this.threadmarkType.canDelete() === false) return;
    if (confirm(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.edit_type_modal.delete_confirmation')))) {
      this.loading = true;
      this.deleting = true;
      this.threadmarkType.delete({}, {
        errorHandler: this.onerror.bind(this)
      }).then(this.hide.bind(this)).catch(() => {
        this.loading = false;
        this.deleting = false;
        m.redraw();
      });
    }
  }
}
flarum.reg.add('ffans-threadmarks', 'admin/components/EditThreadmarkTypeModal', EditThreadmarkTypeModal);

/***/ },

/***/ "./src/admin/components/ThreadmarkTypesPage.tsx"
/*!******************************************************!*\
  !*** ./src/admin/components/ThreadmarkTypesPage.tsx ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThreadmarkTypesPage)
/* harmony export */ });
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/components/ExtensionPage */ "flarum/admin/components/ExtensionPage");
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Icon */ "flarum/common/components/Icon");
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Switch */ "flarum/common/components/Switch");
/* harmony import */ var flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _CreateThreadmarkTypeModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CreateThreadmarkTypeModal */ "./src/admin/components/CreateThreadmarkTypeModal.tsx");
/* harmony import */ var _EditThreadmarkTypeModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./EditThreadmarkTypeModal */ "./src/admin/components/EditThreadmarkTypeModal.tsx");









class ThreadmarkTypesPage extends (flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default()) {
  sortable = null;
  sortableList = null;
  savingTypes = (() => new Set())();
  async setTypeEnabled(type, isEnabled) {
    if (this.savingTypes.has(type.id())) return;
    this.savingTypes.add(type.id());
    try {
      await type.save({
        isEnabled
      });
    } catch {
      // Model.save restores the previous value; the default request handler displays the error.
    } finally {
      this.savingTypes.delete(type.id());
      m.redraw();
    }
  }
  oninit(vnode) {
    super.oninit(vnode);
    this.loading = true;

    // prettier-ignore
    Promise.all([flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().store.find('threadmark-types'), flarum.reg.asyncModuleImport('flarum/admin/utils/loadSortable')]).then(_ref => {
      let [, sortableModule] = _ref;
      this.sortable = sortableModule.default;
      this.loading = false;
      m.redraw();
    });
  }
  get threadmarkTypes() {
    return flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().store.all('threadmark-types').sort((a, b) => a.position() - b.position());
  }
  onListCreate(vnode) {
    this.sortableList = this.sortable.create(vnode.dom, {
      handle: '.ThreadmarkTypeList-handle',
      draggable: '.ThreadmarkTypeList-item',
      ghostClass: 'ThreadmarkTypeList-item--dragging',
      delay: 50,
      delayOnTouchOnly: true,
      touchStartThreshold: 5,
      animation: 150,
      swapThreshold: 0.65,
      onSort: () => this.onSortUpdate()
    });
  }
  onSortUpdate() {
    const order = Array.from(
    // oxfmt-ignore
    this.element.querySelectorAll('.ThreadmarkTypeList-item')).map(element => element.dataset.id);
    order.forEach((id, index) => {
      flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().store.getById('threadmark-types', id)?.pushData({
        attributes: {
          position: index + 1
        }
      });
    });
    flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().request({
      url: `${flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('apiUrl')}/threadmark-types/order`,
      method: 'POST',
      body: {
        order
      }
    });
  }
  content(vnode) {
    if (this.loading) {
      return m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default()), null);
    }
    return m("div", {
      className: "ThreadmarkTypesPage container"
    }, m("div", {
      className: "ThreadmarkTypesPage-toolbar"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      className: "Button Button--primary",
      icon: "fas fa-plus",
      onclick: () => flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().modal.show(_CreateThreadmarkTypeModal__WEBPACK_IMPORTED_MODULE_7__["default"])
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.types.add_button'))), m("div", {
      className: "ThreadmarkTypesPage-tableContainer",
      tabindex: "0",
      role: "region",
      "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.types.table_a11y_label'))
    }, m("table", {
      className: "ThreadmarkTypeList",
      "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.types.table_a11y_label'))
    }, m("thead", null, m("tr", null, m("th", {
      scope: "col",
      className: "ThreadmarkTypeList-order"
    }, m("span", {
      className: "sr-only"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.types.order_heading'))), m("th", {
      scope: "col"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.types.type_heading')), m("th", {
      scope: "col"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.types.key_heading')), m("th", {
      scope: "col"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.types.source_heading')), m("th", {
      scope: "col"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.types.enabled_heading')), m("th", {
      scope: "col",
      className: "ThreadmarkTypeList-actions"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.types.actions_heading')))), m("tbody", {
      oncreate: this.onListCreate.bind(this),
      onremove: () => {
        this.sortableList?.destroy();
        this.sortableList = null;
      }
    }, this.threadmarkTypes.map(type => m("tr", {
      className: "ThreadmarkTypeList-item",
      "data-id": type.id(),
      key: type.id()
    }, m("td", {
      className: "ThreadmarkTypeList-order"
    }, m("span", {
      className: "ThreadmarkTypeList-handle",
      title: flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.types.reorder_tooltip'))
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3___default()), {
      name: "fas fa-grip-vertical"
    }))), m("th", {
      scope: "row",
      className: "ThreadmarkTypeList-name"
    }, m("div", {
      className: "ThreadmarkTypeList-preview"
    }, m("span", {
      className: "ThreadmarkTypeList-icon",
      style: {
        color: type.color()
      }
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3___default()), {
      name: type.icon() || 'fas fa-bookmark'
    })), m("span", null, type.name()))), m("td", null, m("code", {
      className: "ThreadmarkTypeList-key"
    }, type.key())), m("td", {
      className: "ThreadmarkTypeList-source"
    }, type.isBuiltin() ? flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.types.builtin_label') : flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.types.custom_label')), m("td", null, m((flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "ThreadmarkTypeList-status",
      state: type.isEnabled(),
      loading: this.savingTypes.has(type.id()),
      disabled: this.savingTypes.has(type.id()),
      inputAttrs: {
        'aria-label': flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.types.enable_type_a11y_label', {
          name: type.name()
        }))
      },
      onchange: enabled => this.setTypeEnabled(type, enabled)
    })), m("td", {
      className: "ThreadmarkTypeList-actions"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      className: "Button Button--link",
      icon: "fas fa-pen",
      "aria-label": flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_6___default()(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.types.edit_type_a11y_label', {
        name: type.name()
      })),
      onclick: () => {
        flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().modal.show(_EditThreadmarkTypeModal__WEBPACK_IMPORTED_MODULE_8__["default"], {
          threadmarkType: type
        });
      }
    })))), this.threadmarkTypes.length === 0 && m("tr", null, m("td", {
      colspan: "6",
      className: "ThreadmarkTypeList-empty"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.types.empty_text')))))));
  }
}
flarum.reg.add('ffans-threadmarks', 'admin/components/ThreadmarkTypesPage', ThreadmarkTypesPage);

/***/ },

/***/ "./src/admin/extend.ts"
/*!*****************************!*\
  !*** ./src/admin/extend.ts ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extenders */ "flarum/common/extenders");
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/extend */ "./src/common/extend.ts");
/* harmony import */ var _components_ThreadmarkTypesPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ThreadmarkTypesPage */ "./src/admin/components/ThreadmarkTypesPage.tsx");




// prettier-ignore
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([..._common_extend__WEBPACK_IMPORTED_MODULE_1__["default"], new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Admin)().page(_components_ThreadmarkTypesPage__WEBPACK_IMPORTED_MODULE_2__["default"])]);

/***/ },

/***/ "./src/admin/index.ts"
/*!****************************!*\
  !*** ./src/admin/index.ts ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extend: () => (/* reexport safe */ _extend__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extend */ "./src/admin/extend.ts");


flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('ffans-threadmarks', () => {
  flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().registry.for('ffans-threadmarks').registerPermission({
    icon: 'fa-solid fa-book-bookmark',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.permissions.manage_personal_label'),
    permission: 'discussion.ffans-threadmarks.managePersonalThreadmarks'
  }, 'reply', 50).registerPermission({
    icon: 'fa-solid fa-book-bookmark',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.permissions.manage_own_discussion_label'),
    permission: 'discussion.ffans-threadmarks.manageOwnDiscussionThreadmarks'
  }, 'reply', 50).registerPermission({
    icon: 'fa-solid fa-book-bookmark',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('ffans-threadmarks.admin.permissions.manage_discussion_label'),
    permission: 'discussion.ffans-threadmarks.manageDiscussionThreadmarks'
  }, 'moderate', 50);
});

/***/ },

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

/***/ "flarum/admin/app"
/*!******************************************************!*\
  !*** external "flarum.reg.get('core', 'admin/app')" ***!
  \******************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'admin/app');

/***/ },

/***/ "flarum/admin/components/ExtensionPage"
/*!***************************************************************************!*\
  !*** external "flarum.reg.get('core', 'admin/components/ExtensionPage')" ***!
  \***************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'admin/components/ExtensionPage');

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

/***/ "flarum/common/components/ColorPreviewInput"
/*!********************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/ColorPreviewInput')" ***!
  \********************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/ColorPreviewInput');

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

/***/ "flarum/common/components/LoadingIndicator"
/*!*******************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/LoadingIndicator')" ***!
  \*******************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/LoadingIndicator');

/***/ },

/***/ "flarum/common/components/Switch"
/*!*********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Switch')" ***!
  \*********************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Switch');

/***/ },

/***/ "flarum/common/extenders"
/*!*************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/extenders')" ***!
  \*************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/extenders');

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
  !*** ./admin.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extend: () => (/* reexport safe */ _src_admin__WEBPACK_IMPORTED_MODULE_1__.extend)
/* harmony export */ });
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.ts");
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.ts");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map