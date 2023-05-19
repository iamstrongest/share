if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const tabBarList = [
    {
      pagePath: "/pages/sportShop/sportShop?index=0",
      iconPath: "/static/tab_icons/sort.png",
      selectedIconPath: "/static/tab_icons/sort-active.png",
      text: "租借室"
    },
    {
      pagePath: "/pages/sportCart/sportCart?index=1",
      iconPath: "/static/tab_icons/cart.png",
      selectedIconPath: "/static/tab_icons/cart-active.png",
      text: "收藏夹"
    },
    {
      pagePath: "/pages/my/my?index=2",
      iconPath: "/static/tab_icons/my.png",
      selectedIconPath: "/static/tab_icons/my-active.png",
      text: "我的"
    },
    {
      pagePath: "/pages/datingCircles/datingCircles?index=3",
      iconPath: "/static/tab_icons/friendCircle.png",
      selectedIconPath: "/static/tab_icons/friendCircle-active.png",
      text: "谈论圈"
    },
    {
      pagePath: "/pages/consumeHistory/consumeHistory?index=4",
      iconPath: "/static/tab_icons/history.png",
      selectedIconPath: "/static/tab_icons/hostory-active.png",
      text: "历史"
    }
  ];
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$u = {
    data() {
      return {
        dataList: [],
        selectIndex: 0
      };
    },
    props: {
      propsIndex: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.dataList = tabBarList;
      this.selectIndex = parseInt(this.propsIndex);
    },
    methods: {
      select(url, index) {
        uni.navigateTo({
          url
        });
        this.selectIndex = index;
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "tabBar_contianer" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.dataList, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "common_icon",
            key: index,
            onClick: ($event) => $options.select(item.pagePath, index)
          }, [
            vue.createElementVNode("view", { class: "image" }, [
              vue.createElementVNode("image", {
                src: $data.selectIndex == index ? item.selectedIconPath : item.iconPath,
                mode: ""
              }, null, 8, ["src"])
            ]),
            vue.createElementVNode("view", { class: "text" }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(item.text),
                1
                /* TEXT */
              )
            ])
          ], 8, ["onClick"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$f], ["__scopeId", "data-v-c497a889"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/tabBar/tabBar.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const _sfc_main$t = {
    __name: "EquipmentCard",
    props: {
      equipment: {
        type: Object,
        require: true
      },
      style_width: {
        type: Number || String,
        default: 50
      },
      style_height: {
        type: Number || String,
        default: 250
      },
      url: String
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "equipment_container",
            style: vue.normalizeStyle({ height: +__props.style_height + "rpx", width: +__props.style_width + "%" })
          },
          [
            vue.createCommentVNode(` <view class="equipment_container" :style="{height:+style_height+'rpx'}"> `),
            vue.createElementVNode("view", { class: "image" }, [
              vue.createElementVNode("image", {
                src: __props.equipment.imageUrl,
                mode: ""
              }, null, 8, ["src"])
            ]),
            vue.createElementVNode("view", { class: "information" }, [
              vue.createElementVNode(
                "view",
                { class: "name" },
                " 名字:" + vue.toDisplayString(__props.equipment.name),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "type" },
                " 种类:" + vue.toDisplayString(__props.equipment.type),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "price" },
                " 单价:" + vue.toDisplayString(__props.equipment.price),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "unit" },
                " 计费方式:" + vue.toDisplayString(__props.equipment.unit),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "rest_num" },
                " 剩余:" + vue.toDisplayString(__props.equipment.restNum),
                1
                /* TEXT */
              )
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const EquipmentCard = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-69d51b90"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/common/EquipmentCard.vue"]]);
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * pinia v2.0.32
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const getActivePinia = () => vue.getCurrentInstance() && vue.inject(piniaSymbol) || activePinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      pinia.state.value = JSON.parse(await navigator.clipboard.readText());
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia.state.value = JSON.parse(text);
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: "Reset the state (option store only)",
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (!store._isOptionsAPI) {
                toastMessage(`Cannot reset "${nodeId}" store because it's a setup store.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        activeAction = void 0;
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        });
        return actions[actionName].apply(trackedStore, arguments);
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    if (options.state) {
      store._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
      patchActionForGrouping(
        // @ts-expect-error: can cast the store...
        store,
        Object.keys(options.actions)
      );
      const originalHotUpdate = store._hotUpdate;
      vue.toRaw(store)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
      };
    }
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  const isUseStore = (fn) => {
    return typeof fn === "function" && typeof fn.$id === "string";
  };
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  function acceptHMRUpdate(initialUseStore, hot) {
    return (newModule) => {
      const pinia = hot.data.pinia || initialUseStore._pinia;
      if (!pinia) {
        return;
      }
      hot.data.pinia = pinia;
      for (const exportName in newModule) {
        const useStore = newModule[exportName];
        if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
          const id = useStore.$id;
          if (id !== initialUseStore.$id) {
            console.warn(`The id of the store changed from "${initialUseStore.$id}" to "${id}". Reloading.`);
            return hot.invalidate();
          }
          const existingStore = pinia._s.get(id);
          if (!existingStore) {
            console.log(`[Pinia]: skipping hmr because store doesn't exist yet`);
            return;
          }
          useStore(pinia, existingStore);
        }
      }
    };
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function skipHydrate(obj) {
    return Object.defineProperty(obj, skipHydrateSymbol, {});
  }
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
    return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    store.$reset = function $reset() {
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    };
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = vue.markRaw([]);
    let actionSubscriptions = vue.markRaw([]);
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = () => {
      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    };
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(
      assign(
        {
          _hmrPayload,
          _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
          // devtools custom properties
        },
        partialStore
        // must be added later
        // setupStore
      )
    );
    pinia._s.set($id, store);
    const setupStore = pinia._e.run(() => {
      scope = vue.effectScope();
      return scope.run(() => setup());
    });
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
        Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
    }
    function useStore(pinia, hot) {
      const currentInstance = vue.getCurrentInstance();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || currentInstance && vue.inject(piniaSymbol, null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT && currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  let mapStoreSuffix = "Store";
  function setMapStoreSuffix(suffix) {
    mapStoreSuffix = suffix;
  }
  function mapStores(...stores) {
    if (Array.isArray(stores[0])) {
      console.warn(`[🍍]: Directly pass all stores to "mapStores()" without putting them in an array:
Replace
	mapStores([useAuthStore, useCartStore])
with
	mapStores(useAuthStore, useCartStore)
This will fail in production if not fixed.`);
      stores = stores[0];
    }
    return stores.reduce((reduced, useStore) => {
      reduced[useStore.$id + mapStoreSuffix] = function() {
        return useStore(this.$pinia);
      };
      return reduced;
    }, {});
  }
  function mapState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function() {
        return useStore(this.$pinia)[key];
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function() {
        const store = useStore(this.$pinia);
        const storeKey = keysOrMapper[key];
        return typeof storeKey === "function" ? storeKey.call(this, store) : store[storeKey];
      };
      return reduced;
    }, {});
  }
  const mapGetters = mapState;
  function mapActions(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[key](...args);
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[keysOrMapper[key]](...args);
      };
      return reduced;
    }, {});
  }
  function mapWritableState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[key];
        },
        set(value) {
          return useStore(this.$pinia)[key] = value;
        }
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[keysOrMapper[key]];
        },
        set(value) {
          return useStore(this.$pinia)[keysOrMapper[key]] = value;
        }
      };
      return reduced;
    }, {});
  }
  function storeToRefs(store) {
    {
      store = vue.toRaw(store);
      const refs = {};
      for (const key in store) {
        const value = store[key];
        if (vue.isRef(value) || vue.isReactive(value)) {
          refs[key] = // ---
          vue.toRef(store, key);
        }
      }
      return refs;
    }
  }
  const PiniaVuePlugin = function(_Vue) {
    _Vue.mixin({
      beforeCreate() {
        const options = this.$options;
        if (options.pinia) {
          const pinia = options.pinia;
          if (!this._provided) {
            const provideCache = {};
            Object.defineProperty(this, "_provided", {
              get: () => provideCache,
              set: (v) => Object.assign(provideCache, v)
            });
          }
          this._provided[piniaSymbol] = pinia;
          if (!this.$pinia) {
            this.$pinia = pinia;
          }
          pinia._a = this;
          if (IS_CLIENT) {
            setActivePinia(pinia);
          }
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(pinia._a, pinia);
          }
        } else if (!this.$pinia && options.parent && options.parent.$pinia) {
          this.$pinia = options.parent.$pinia;
        }
      },
      destroyed() {
        delete this._pStores;
      }
    });
  };
  const Pinia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    get MutationType() {
      return MutationType;
    },
    PiniaVuePlugin,
    acceptHMRUpdate,
    createPinia,
    defineStore,
    getActivePinia,
    mapActions,
    mapGetters,
    mapState,
    mapStores,
    mapWritableState,
    setActivePinia,
    setMapStoreSuffix,
    skipHydrate,
    storeToRefs
  }, Symbol.toStringTag, { value: "Module" }));
  const datingCircleStore = defineStore("datingCircle", {
    // other options...
    state: () => {
      return {
        // 发送的信息，需要跨组件传输
        message: "",
        // 是否展示组件
        isShowPublish: false,
        // type,1表示发布楼主类型，2表示发布回复者类型
        type: 0,
        reply_id: "",
        floor: "",
        isPublishLandlord: false,
        isPublishReply: false
      };
    },
    getters: {
      retutnIsPublishLandlord: (state) => state.isPublishLandlord,
      retutnIsPublishReply: (state) => state.isPublishLandlord
    }
  });
  const _sfc_main$s = {
    setup(props) {
      const useDatingCircleStore = datingCircleStore();
      const back = () => {
        uni.navigateBack();
      };
      const publish = () => {
        useDatingCircleStore.isShowPublish = true;
        useDatingCircleStore.type = 1;
      };
      const goUrl = () => {
        uni.navigateTo({
          url: `${props.url}`
        });
      };
      return {
        back,
        publish,
        goUrl
      };
    },
    props: {
      margin_height: {
        type: Number,
        default: 50
      },
      nav_text: {
        type: String,
        default: "搜索界面"
      },
      right_text: {
        type: String,
        default: "搜索"
      },
      right_img: {
        type: String,
        default: "../../static/images/search.png"
      },
      url: {
        type: String,
        default: "/pages/search/search"
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "top",
        style: vue.normalizeStyle({ "margin-top": $props.margin_height + "rpx" })
      },
      [
        vue.createElementVNode("view", {
          class: "back",
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.back && $setup.back(...args))
        }, [
          vue.createElementVNode("image", {
            src: "/static/images/back.png",
            mode: ""
          })
        ]),
        vue.createElementVNode(
          "text",
          null,
          vue.toDisplayString($props.nav_text),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", {
          class: "right",
          onClick: _cache[1] || (_cache[1] = (...args) => $setup.goUrl && $setup.goUrl(...args))
        }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($props.right_text),
            1
            /* TEXT */
          ),
          vue.createElementVNode("image", {
            src: $props.right_img,
            mode: ""
          }, null, 8, ["src"])
        ])
      ],
      4
      /* STYLE */
    );
  }
  const navSearch = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$e], ["__scopeId", "data-v-e414a9a0"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/navBar/navSearch.vue"]]);
  const detailCartStore = defineStore("detail", {
    // other options...
    state: () => {
      return {
        //判断收藏夹有无此器材的ID，省得去判断详细的器材信息
        detail: {}
      };
    }
  });
  const personStore = defineStore("person", {
    // other options...
    state: () => {
      return {
        // 所有这些属性都将自动推断其类型
        // baseUrl:"http://127.0.0.1:3000/api",
        // baseUrl:"http://192.168.137.1:3000/api",
        // baseUrl:"http://47.106.134.6/:3003/api",
        authorization: "",
        personData: {},
        anotherData: {},
        fullPayList: [],
        partPayList: []
      };
    }
  });
  const _sfc_main$r = {
    __name: "sportShop",
    setup(__props) {
      personStore();
      const useDetailCartStore = detailCartStore();
      const {
        proxy
      } = vue.getCurrentInstance();
      const sort = vue.ref([]);
      const selectIndex = vue.ref(0);
      const selectType = vue.ref([]);
      const init = () => {
        uni.request({
          method: "GET",
          url: `${proxy.baseUrl}/types`,
          // header: {
          //    'content-type': 'application/json;charset:utf-8'
          //    },
          success(res) {
            sort.value = res.data.data;
            changColor(0, sort.value[0]);
          }
        });
      };
      const changColor = (index, type) => {
        selectIndex.value = index;
        uni.request({
          method: "GET",
          url: `${proxy.baseUrl}/type`,
          data: {
            type
          },
          success(res) {
            selectType.value = res.data.data;
          }
        });
      };
      const goDetail = (equipment) => {
        useDetailCartStore.detail = equipment;
        uni.navigateTo({
          url: `/pages/details/details`
        });
      };
      init();
      return (_ctx, _cache) => {
        const _component_tabBar = resolveEasycom(vue.resolveDynamicComponent("tabBar"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "sport_shop_container" }, [
          vue.createVNode(navSearch, { nav_text: "租借室" }),
          vue.createElementVNode("view", { class: "sport_shop_container_top" }, [
            vue.createElementVNode("scroll-view", { class: "left" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(sort.value, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: vue.normalizeClass(["left_conmon_type", { active: index == selectIndex.value }]),
                    onClick: ($event) => changColor(index, item)
                  }, vue.toDisplayString(item), 11, ["onClick"]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              )),
              vue.createCommentVNode(" 分类 ")
            ]),
            vue.createElementVNode(
              "scroll-view",
              {
                class: "right",
                "scroll-y": "true",
                "show-scrollbar": "false",
                onScrolltolower: _cache[0] || (_cache[0] = (...args) => _ctx.getMore && _ctx.getMore(...args))
              },
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(selectType.value, (item, index) => {
                    return vue.openBlock(), vue.createBlock(EquipmentCard, {
                      key: index,
                      equipment: item,
                      onClick: ($event) => goDetail(item),
                      style_width: 100
                    }, null, 8, ["equipment", "onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                vue.createCommentVNode(" 分类后的体育器材 ")
              ],
              32
              /* HYDRATE_EVENTS */
            ),
            vue.createVNode(_component_tabBar, { propsIndex: 0 })
          ])
        ]);
      };
    }
  };
  const PagesSportShopSportShop = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-da629555"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/sportShop/sportShop.vue"]]);
  const _sfc_main$q = {
    setup() {
      const usePersonStore = personStore();
      const {
        proxy
      } = vue.getCurrentInstance();
      const isBck = vue.ref(false);
      uni.request({
        method: "POST",
        url: `${proxy.baseUrl}/validate`,
        header: {
          authorization: usePersonStore.authorization
        },
        data: {
          phone: usePersonStore.personData.phone
        },
        success(res) {
          if (res.data.code == 401) {
            uni.navigateTo({
              url: "/pages/login/login"
            });
          } else if (res.data.code == 200) {
            usePersonStore.authorization = res.data.token;
          }
        }
      });
      const loginOut = () => {
        if (usePersonStore.personData.id !== void 0) {
          usePersonStore.personData = {};
          uni.navigateTo({
            url: "/pages/login/login"
          });
        } else {
          uni.showToast({
            title: "用户未登录"
          });
        }
      };
      const changeBck = () => {
        isBck.value = !isBck.value;
      };
      const goSet = () => {
        uni.navigateTo({
          url: "/pages/set/set"
        });
      };
      return {
        usePersonStore,
        loginOut,
        changeBck,
        isBck,
        goSet
      };
    },
    data() {
      return {
        index: ""
      };
    },
    onLoad(e) {
      this.index = e.index;
    },
    methods: {
      goConsumeHistory() {
        this.index = 3;
        uni.navigateTo({
          url: `/pages/consumeHistory/consumeHistory?index=${this.index}`
        });
      },
      goDatingCircles() {
        this.index = 4;
        uni.navigateTo({
          url: `/pages/datingCircles/datingCircles?index=${this.index}`
        });
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tabBar = resolveEasycom(vue.resolveDynamicComponent("tabBar"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["my_container", { bck: $setup.isBck }])
      },
      [
        vue.createElementVNode("view", { id: "icon" }, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["icon_left", { icon_left_active: $setup.isBck }]),
              onClick: _cache[0] || (_cache[0] = (...args) => $setup.goSet && $setup.goSet(...args))
            },
            null,
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["icon_right", { icon_right_active: $setup.isBck }]),
              onClick: _cache[1] || (_cache[1] = (...args) => $setup.changeBck && $setup.changeBck(...args))
            },
            null,
            2
            /* CLASS */
          )
        ]),
        vue.createElementVNode("view", { class: "top" }, [
          vue.createElementVNode("image", {
            class: "image",
            src: $setup.usePersonStore.personData.imageUrl,
            mode: ""
          }, null, 8, ["src"])
        ]),
        vue.createElementVNode("view", { class: "userinfo" }, [
          vue.createElementVNode("view", { class: "userinfo_top" }, [
            vue.createElementVNode("view", { class: "username" }, [
              vue.createElementVNode(
                "text",
                { class: "font_style_common" },
                "昵称:" + vue.toDisplayString($setup.usePersonStore.personData.username),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "possession" }, [
              vue.createElementVNode("text", { class: "font_style_common" }, "金额:"),
              vue.createTextVNode(
                vue.toDisplayString($setup.usePersonStore.personData.money),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "credit" }, [
              vue.createElementVNode("text", { class: "font_style_common" }, "信用分:"),
              vue.createTextVNode(
                vue.toDisplayString($setup.usePersonStore.personData.credit),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "signature" }, [
              vue.createElementVNode("text", { class: "font_style_common" }, "签名:"),
              vue.createTextVNode(
                vue.toDisplayString($setup.usePersonStore.personData.description),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode("view", { class: "userinfo_dating_circle" }, [
            vue.createElementVNode("view", { class: "public_num" }, [
              vue.createCommentVNode(" 发表谈论数量 "),
              vue.createElementVNode(
                "view",
                { class: "userinfo_dating_circle_common" },
                vue.toDisplayString($setup.usePersonStore.anotherData.publishLength),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "" }, " 发帖数 ")
            ]),
            vue.createElementVNode("view", { class: "public_num" }, [
              vue.createCommentVNode(" 被回复数量 "),
              vue.createElementVNode(
                "view",
                { class: "userinfo_dating_circle_common" },
                vue.toDisplayString($setup.usePersonStore.anotherData.replyLength),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "" }, " 回复数 ")
            ]),
            vue.createElementVNode("view", { class: "reply_num" }, [
              vue.createCommentVNode(" 被点赞数 "),
              vue.createElementVNode(
                "view",
                { class: "userinfo_dating_circle_common" },
                vue.toDisplayString($setup.usePersonStore.anotherData.thumbsLength),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "" }, " 被赞数 ")
            ])
          ])
        ]),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["login_out_btn", {
              deepskyblue: $setup.usePersonStore.personData.id !== void 0,
              skyblue: $setup.usePersonStore.personData.id == void 0
            }]),
            onClick: _cache[2] || (_cache[2] = (...args) => $setup.loginOut && $setup.loginOut(...args))
          },
          " 退出登录 ",
          2
          /* CLASS */
        ),
        vue.createElementVNode("view", null, [
          vue.createVNode(_component_tabBar, { propsIndex: 2 })
        ])
      ],
      2
      /* CLASS */
    );
  }
  const PagesMyMy = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$d], ["__scopeId", "data-v-2f1ef635"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/my/my.vue"]]);
  function useDate(parms) {
    if (parms == void 0) {
      const year = new Date().getFullYear();
      const month = parse(new Date().getMonth() + 1);
      const day = parse(new Date().getDate());
      const hour = parse(new Date().getHours());
      const minutes = parse(new Date().getMinutes());
      const seconds = parse(new Date().getSeconds());
      return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
    } else {
      let date = new Date(parms);
      let year = date.getFullYear();
      let Month = parse(date.getMonth() + 1);
      let Day = parse(date.getDate());
      let Hours = parse(date.getHours());
      let Minutes = parse(date.getMinutes());
      let Seconds = parse(date.getSeconds());
      return `${year}-${Month}-${Day} ${Hours}:${Minutes}:${Seconds}`;
    }
  }
  function parse(parmas) {
    return parmas >= 10 ? parmas : "0" + parmas;
  }
  const _sfc_main$p = {
    __name: "SuccessPay",
    setup(__props) {
      const usePersonStore = personStore();
      const data = vue.ref([]);
      data.value = usePersonStore.fullPayList;
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          data.value.length == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "warn"
          }, " 亲~，查询您暂无租借历史，请前往租借室租借吧! ")) : (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            vue.renderList(data.value, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "list",
                key: index
              }, [
                vue.createElementVNode("view", { class: "payName" }, [
                  vue.createElementVNode("text", { class: "common" }, "器材名字:"),
                  vue.createTextVNode(
                    vue.toDisplayString(item.payName),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "numbers" }, [
                  vue.createElementVNode("text", { class: "common" }, "数量:"),
                  vue.createTextVNode(
                    vue.toDisplayString(item.nums),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "prices" }, [
                  vue.createElementVNode("text", { class: "common" }, "单价:"),
                  vue.createTextVNode(
                    vue.toDisplayString(item.prices),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "payTime" }, [
                  vue.createElementVNode("text", { class: "common" }, "租借时间:"),
                  vue.createTextVNode(
                    vue.toDisplayString(vue.unref(useDate)(item.payTime)),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "returnTime" }, [
                  vue.createElementVNode("text", { class: "common" }, "归还时间:"),
                  vue.createTextVNode(
                    vue.toDisplayString(vue.unref(useDate)(item.returnTime)),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "cost" }, [
                  vue.createElementVNode("text", { class: "common" }, "花费金额:"),
                  vue.createTextVNode(
                    vue.toDisplayString(item.cost),
                    1
                    /* TEXT */
                  )
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  };
  const SuccessPay = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-9002f96e"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/history/SuccessPay.vue"]]);
  const _sfc_main$o = {
    __name: "FailPay",
    setup(__props) {
      const usePersonStore = personStore();
      const data = vue.ref([]);
      data.value = usePersonStore.partPayList;
      const toPay = () => {
        if (data.value.length > 0) {
          uni.navigateTo({
            url: "/pages/paymentMethods/paymentMethods"
          });
        } else {
          uni.showToast({
            title: "请您先去租借器材，再来结算吧~"
          });
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "" }, [
          data.value.length == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "warn"
          }, " 亲~，查询您暂无租借历史，请前往租借室租借吧! ")) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "list"
          }, [
            vue.createElementVNode("view", { class: "payName" }, [
              vue.createElementVNode("text", { class: "common" }, "器材名字:"),
              vue.createTextVNode(
                vue.toDisplayString(data.value[0].payName),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "numbers" }, [
              vue.createElementVNode("text", { class: "common" }, "数量:"),
              vue.createTextVNode(
                vue.toDisplayString(data.value[0].nums),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "prices" }, [
              vue.createElementVNode("text", { class: "common" }, "单价"),
              vue.createTextVNode(
                ":" + vue.toDisplayString(data.value[0].prices),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "payTime" }, [
              vue.createElementVNode("text", { class: "common" }, "租借时间:"),
              vue.createTextVNode(
                vue.toDisplayString(vue.unref(useDate)(data.value[0].payTime)),
                1
                /* TEXT */
              )
            ])
          ])),
          vue.createElementVNode("view", {
            class: "return",
            onClick: toPay
          }, " 点击归还 ")
        ]);
      };
    }
  };
  const FailPay = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-f9406666"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/history/FailPay.vue"]]);
  const collectCartStore = defineStore("collectCart", {
    // other options...
    state: () => {
      return {
        //判断收藏夹有无此器材的ID，省得去判断详细的器材信息
        selectIdList: [],
        // 收藏夹器材的详细信息
        selectEquipmentList: [],
        testId: 0,
        isShowOprate: false,
        clickList: {
          idList: [],
          payNameList: [],
          numList: [],
          prices: []
        }
      };
    },
    getters: {
      judgeId: (state) => (id) => state.selectIdList.includes(id)
      // judgeSelectIdListLength:(state)=>{
      // 	__f__('log','at stores/collectCart.js:26',state.selectIdList.length);
      // 	return state.selectIdList.length>0
      // }
    },
    actions: {
      init(id) {
        if (id === void 0)
          return;
        uni.request({
          method: "GET",
          url: "http://127.0.0.1:3000/api/getCart",
          // url:"http://192.168.137.1:3000/api/getCart",
          // url:"http://47.106.134.6/:3003/api/getCart",
          data: {
            id
          },
          success(res) {
            this.selectIdList = res.data.selectId;
            this.selectEquipmentList = res.data.data;
          }
        });
      }
    }
  });
  const _sfc_main$n = {
    setup() {
      const usePersonStore = personStore();
      collectCartStore();
      const {
        proxy
      } = vue.getCurrentInstance();
      const show = vue.ref("SuccessPay");
      const change = (component) => {
        show.value = component;
      };
      uni.request({
        method: "POST",
        url: `${proxy.baseUrl}/validate`,
        header: {
          authorization: usePersonStore.authorization
        },
        data: {
          phone: usePersonStore.personData.phone
        },
        success(res) {
          if (res.data.code == 401) {
            uni.navigateTo({
              url: "/pages/login/login"
            });
          } else if (res.data.code == 200) {
            usePersonStore.authorization = res.data.token;
          }
        }
      });
      uni.request({
        method: "GET",
        url: `${proxy.baseUrl}/order`,
        data: {
          user_id: usePersonStore.personData.id
        },
        success(res) {
          usePersonStore.fullPayList = res.data.fullPayList;
          usePersonStore.partPayList = res.data.partPayList;
        }
      });
      return {
        show,
        change,
        usePersonStore
      };
    },
    components: {
      SuccessPay,
      FailPay
    },
    onLoad() {
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tabBar = resolveEasycom(vue.resolveDynamicComponent("tabBar"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "history_container" }, [
      vue.createElementVNode("view", { class: "top" }, [
        vue.createElementVNode("view", {
          class: "success",
          onClick: _cache[0] || (_cache[0] = ($event) => $setup.change("SuccessPay"))
        }, "已支付"),
        vue.createElementVNode("view", {
          class: "fail",
          onClick: _cache[1] || (_cache[1] = ($event) => $setup.change("FailPay"))
        }, "待支付")
      ]),
      vue.createElementVNode("view", { class: "data_show" }, [
        (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($setup.show)))
      ]),
      vue.createVNode(_component_tabBar, { propsIndex: 4 })
    ]);
  }
  const PagesConsumeHistoryConsumeHistory = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$c], ["__scopeId", "data-v-30930065"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/consumeHistory/consumeHistory.vue"]]);
  const _sfc_main$m = {
    setup() {
      const useDatingCircleStore = datingCircleStore();
      const back = () => {
        uni.navigateBack();
      };
      const publish = () => {
        useDatingCircleStore.isShowPublish = true;
        useDatingCircleStore.type = 1;
      };
      return {
        back,
        publish
      };
    },
    props: {
      margin_height: {
        type: Number,
        default: 50
      },
      nav_text: {
        type: String,
        default: "谈论圈"
      },
      right_text: {
        type: String,
        default: "选择"
      },
      right_img: {
        type: String,
        default: "../../static/images/publish.png"
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "top",
        style: vue.normalizeStyle({ "margin-top": $props.margin_height + "rpx" })
      },
      [
        vue.createElementVNode("view", {
          class: "back",
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.back && $setup.back(...args))
        }, [
          vue.createElementVNode("image", {
            src: "/static/images/back.png",
            mode: ""
          })
        ]),
        vue.createElementVNode(
          "text",
          null,
          vue.toDisplayString($props.nav_text),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", {
          class: "right",
          onClick: _cache[1] || (_cache[1] = (...args) => $setup.publish && $setup.publish(...args))
        }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($props.right_text),
            1
            /* TEXT */
          ),
          vue.createElementVNode("image", {
            src: $props.right_img,
            mode: ""
          }, null, 8, ["src"])
        ])
      ],
      4
      /* STYLE */
    );
  }
  const navBarBatingCircle = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$b], ["__scopeId", "data-v-c25082c6"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/navBar/navBarBatingCircle.vue"]]);
  const _sfc_main$l = {
    __name: "Publish",
    setup(__props) {
      const useDatingCircleStore = datingCircleStore();
      const usePersonStore = personStore();
      const {
        proxy
      } = vue.getCurrentInstance();
      const publish = () => {
        uni.request({
          method: "POST",
          url: `${proxy.baseUrl}/validate`,
          header: {
            authorization: usePersonStore.authorization
          },
          data: {
            phone: usePersonStore.personData.phone
          },
          success(res) {
            if (res.data.code == 401) {
              uni.navigateTo({
                url: "/pages/login/login"
              });
            } else if (res.data.code == 200) {
              usePersonStore.authorization = res.data.token;
              if (useDatingCircleStore.type == 1) {
                uni.request({
                  url: `${proxy.baseUrl}/add/landlord`,
                  method: "POST",
                  data: {
                    publish_id: usePersonStore.personData.id,
                    message: useDatingCircleStore.message
                  },
                  success(res2) {
                    if (res2.data.code == 0) {
                      uni.showToast({
                        title: `${res2.data.message}`
                      });
                      useDatingCircleStore.isShowPublish = false;
                      useDatingCircleStore.message = "";
                      useDatingCircleStore.type = 0;
                      usePersonStore.isPublishLandlord = true;
                      uni.navigateTo({
                        url: "/pages/datingCircles/datingCircles"
                      });
                    }
                  }
                });
              } else if (useDatingCircleStore.type == 2) {
                uni.request({
                  url: `${proxy.baseUrl}/add/reply`,
                  method: "POST",
                  data: {
                    publish_id: usePersonStore.personData.id,
                    message: useDatingCircleStore.message,
                    reply_id: useDatingCircleStore.reply_id,
                    floor: useDatingCircleStore.floor
                  },
                  success(res2) {
                    if (res2.data.code == 0) {
                      uni.showToast({
                        title: `${res2.data.message}`
                      });
                      useDatingCircleStore.isShowPublish = false;
                      useDatingCircleStore.message = "";
                      useDatingCircleStore.type = 0;
                      useDatingCircleStore.reply_id = "";
                      useDatingCircleStore.floor = ";";
                      usePersonStore.isPublishReply = true;
                      uni.navigateTo({
                        url: "/pages/datingCircles/datingCircles"
                      });
                    }
                  }
                });
              }
              uni.request({
                method: "GET",
                url: `${proxy.baseUrl}/user/another`,
                data: {
                  id: usePersonStore.personData.id
                },
                success(res2) {
                  usePersonStore.anotherData = res2.data.data;
                }
              });
            }
          }
        });
      };
      const cancle = () => {
        useDatingCircleStore.isShowPublish = false;
        useDatingCircleStore.message = "";
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "mask" }, [
          vue.createElementVNode("view", { class: "publish_container" }, [
            vue.withDirectives(vue.createElementVNode(
              "textarea",
              {
                class: "textarea",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(useDatingCircleStore).message = $event),
                placeholder: "善于结善缘,恶言伤人心"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, vue.unref(useDatingCircleStore).message]
            ]),
            vue.createElementVNode("view", { class: "buttons" }, [
              vue.createElementVNode("view", {
                class: "publish common",
                onClick: publish
              }, [
                vue.createElementVNode("text", null, "发布")
              ]),
              vue.createElementVNode("view", {
                class: "cancle common",
                onClick: cancle
              }, [
                vue.createElementVNode("text", null, "取消")
              ])
            ])
          ])
        ]);
      };
    }
  };
  const Publish = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-0a45d052"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/datingCircle/Publish.vue"]]);
  const _sfc_main$k = {
    __name: "Reply",
    props: {
      image_width: {
        type: Number,
        default: 70
      },
      image_height: {
        type: Number,
        default: 70
      },
      margin_left: {
        type: Number,
        default: -70
      },
      font_style: {
        type: Number || String,
        default: 700
      },
      data: {
        type: Object
      }
    },
    setup(__props) {
      const props = __props;
      const usePersonStore = personStore();
      const useDatingCircleStore = datingCircleStore();
      const {
        proxy
      } = vue.getCurrentInstance();
      const goodNum = vue.ref(0);
      const userInThumbs = vue.ref([]);
      const getFollowThumbsLength = () => {
        uni.request({
          url: `${proxy.baseUrl}/get/followThumbs`,
          method: "GET",
          data: {
            follow_id: props.data.id
          },
          success(res) {
            goodNum.value = res.data.length;
            userInThumbs.value = res.data.data;
          }
        });
      };
      const changeFollowThumbs = () => {
        uni.request({
          method: "POST",
          url: `${proxy.baseUrl}/validate`,
          header: {
            authorization: usePersonStore.authorization
          },
          data: {
            phone: usePersonStore.personData.phone
          },
          success(res) {
            if (res.data.code == 401) {
              uni.navigateTo({
                url: "/pages/login/login"
              });
            } else if (res.data.code == 200) {
              usePersonStore.authorization = res.data.token;
              uni.request({
                url: `${proxy.baseUrl}/change/followThumbs`,
                method: "POST",
                data: {
                  follow_id: props.data.id,
                  user_id: usePersonStore.personData.id,
                  been_given_id: props.data.publish_id
                },
                success(res2) {
                  if (res2.data.code == 0) {
                    uni.request({
                      method: "GET",
                      url: `${proxy.baseUrl}/user/another`,
                      data: {
                        id: usePersonStore.personData.id
                      },
                      success(res3) {
                        usePersonStore.anotherData = res3.data.data;
                      }
                    });
                    getFollowThumbsLength();
                  }
                }
              });
            }
          }
        });
      };
      const reply = () => {
        useDatingCircleStore.isShowPublish = true;
        useDatingCircleStore.type = 2;
        useDatingCircleStore.reply_id = props.data.publish_id;
        useDatingCircleStore.floor = props.data.floor;
      };
      getFollowThumbsLength();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "message_container" }, [
          vue.createElementVNode(
            "view",
            {
              class: "left_image",
              style: vue.normalizeStyle({ "margin-left": props.margin_left + "rpx" })
            },
            [
              vue.createElementVNode("image", {
                src: __props.data.imageUrl,
                mode: "",
                style: vue.normalizeStyle({ width: props.image_width + "rpx", height: props.image_height + "rpx", "font-weight": props.font_style })
              }, null, 12, ["src"])
            ],
            4
            /* STYLE */
          ),
          vue.createElementVNode("view", { class: "right_information" }, [
            vue.createElementVNode(
              "text",
              { class: "username" },
              vue.toDisplayString(__props.data.publish_name) + "=>" + vue.toDisplayString(__props.data.reply_name),
              1
              /* TEXT */
            ),
            vue.createCommentVNode(" 文字 "),
            vue.createElementVNode(
              "view",
              { class: "msg" },
              vue.toDisplayString(__props.data.message),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "operate" }, [
              vue.createElementVNode(
                "view",
                { class: "time" },
                vue.toDisplayString(vue.unref(useDate)(__props.data.time)),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", {
                class: "reply",
                onClick: reply
              }, [
                vue.createElementVNode("text", null, "回复"),
                vue.createElementVNode("image", {
                  src: "/static/images/reply.png",
                  mode: ""
                })
              ]),
              vue.createElementVNode("view", {
                class: "image",
                onClick: changeFollowThumbs
              }, [
                !userInThumbs.value.includes(vue.unref(usePersonStore).personData.id) ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  src: "/static/images/collect.png",
                  mode: ""
                })) : (vue.openBlock(), vue.createElementBlock("image", {
                  key: 1,
                  src: "/static/images/collect_active.png",
                  mode: ""
                })),
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(goodNum.value),
                  1
                  /* TEXT */
                )
              ])
            ])
          ])
        ]);
      };
    }
  };
  const Reply = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-6393d47c"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/datingCircle/Reply.vue"]]);
  const _sfc_main$j = {
    __name: "Landlord",
    props: {
      image_width: {
        type: Number,
        default: 70
      },
      image_height: {
        type: Number,
        default: 70
      },
      isLandlord: {
        type: Boolean,
        default: false
      },
      margin_left: {
        type: Number,
        default: 100
      },
      font_style: {
        type: Number || String,
        default: 700
      },
      data: {
        type: Object
      }
    },
    setup(__props) {
      const props = __props;
      const useDatingCircleStore = datingCircleStore();
      const usePersonStore = personStore();
      const {
        proxy
      } = vue.getCurrentInstance();
      const isShowMore = vue.ref(false);
      let length = vue.ref(0);
      let page = vue.ref(1);
      let nowShowLength = vue.ref(0);
      const goodNum = vue.ref(0);
      const userInThumbs = vue.ref([]);
      let replyData = vue.ref([]);
      const getLength = () => {
        uni.request({
          url: `${proxy.baseUrl}/getReplyLength`,
          method: "GET",
          data: {
            floor: props.data.id
          },
          success(res) {
            length.value = res.data.length;
          }
        });
      };
      const getLandThumbsLength = () => {
        uni.request({
          url: `${proxy.baseUrl}/get/landThumbs`,
          method: "GET",
          data: {
            land_id: props.data.id
          },
          success(res) {
            goodNum.value = res.data.length;
            userInThumbs.value = res.data.data;
          }
        });
      };
      const changeLandThumbs = () => {
        uni.request({
          method: "POST",
          url: `${proxy.baseUrl}/validate`,
          header: {
            authorization: usePersonStore.authorization
          },
          data: {
            phone: usePersonStore.personData.phone
          },
          success(res) {
            if (res.data.code == 401) {
              uni.navigateTo({
                url: "/pages/login/login"
              });
            } else if (res.data.code == 200) {
              usePersonStore.authorization = res.data.token;
              uni.request({
                url: `${proxy.baseUrl}/change/landThumbs`,
                method: "POST",
                data: {
                  land_id: props.data.id,
                  user_id: usePersonStore.personData.id,
                  been_given_id: props.data.user_id
                },
                success(res2) {
                  if (res2.data.code == 0) {
                    getLandThumbsLength();
                    uni.request({
                      method: "GET",
                      url: `${proxy.baseUrl}/user/another`,
                      data: {
                        id: usePersonStore.personData.id
                      },
                      success(res3) {
                        usePersonStore.anotherData = res3.data.data;
                      }
                    });
                  }
                }
              });
            }
          }
        });
      };
      const addMore = () => {
        if (!isShowMore.value) {
          isShowMore.value = true;
        }
        uni.request({
          url: `${proxy.baseUrl}/reply/${props.data.id}`,
          method: "GET",
          data: {
            page: page.value
          },
          success(res) {
            replyData.value = [...replyData.value, ...res.data.data];
            page.value++;
            nowShowLength.value += res.data.length;
          }
        });
      };
      const reply = () => {
        useDatingCircleStore.isShowPublish = true;
        useDatingCircleStore.type = 2;
        useDatingCircleStore.reply_id = props.data.user_id;
        useDatingCircleStore.floor = props.data.id;
      };
      getLength();
      getLandThumbsLength();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "landlord_container" }, [
          vue.createElementVNode("view", { class: "message" }, [
            vue.createElementVNode(
              "view",
              {
                class: "left_image",
                style: vue.normalizeStyle({ "margin-left": props.margin_left + "rpx" })
              },
              [
                vue.createElementVNode("image", {
                  src: __props.data.imageUrl,
                  mode: "",
                  style: vue.normalizeStyle({ width: props.image_width + "rpx", height: props.image_height + "rpx", "font-weight": props.font_style })
                }, null, 12, ["src"])
              ],
              4
              /* STYLE */
            ),
            vue.createElementVNode("view", { class: "right_information" }, [
              vue.createElementVNode(
                "text",
                { class: "username" },
                vue.toDisplayString(__props.data.username),
                1
                /* TEXT */
              ),
              vue.createCommentVNode(" 文字 "),
              vue.createElementVNode(
                "view",
                { class: "msg" },
                vue.toDisplayString(__props.data.message),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "operate" }, [
                vue.createElementVNode(
                  "view",
                  { class: "time" },
                  vue.toDisplayString(vue.unref(useDate)(__props.data.time)),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", {
                  class: "reply",
                  onClick: reply
                }, [
                  vue.createElementVNode("text", null, "回复"),
                  vue.createElementVNode("image", {
                    src: "/static/images/reply.png",
                    mode: ""
                  })
                ]),
                vue.createElementVNode("view", {
                  class: "image",
                  onClick: changeLandThumbs
                }, [
                  !userInThumbs.value.includes(vue.unref(usePersonStore).personData.id) ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    src: "/static/images/collect.png",
                    mode: ""
                  })) : (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    { key: 1 },
                    [
                      vue.createCommentVNode(" v-else "),
                      vue.createElementVNode("image", {
                        src: "/static/images/collect_active.png",
                        mode: ""
                      })
                    ],
                    2112
                    /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                  )),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(goodNum.value),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              isShowMore.value && vue.unref(length) > 0 ? (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                vue.renderList(vue.unref(replyData), (item, index) => {
                  return vue.openBlock(), vue.createBlock(Reply, {
                    data: item,
                    key: index
                  }, null, 8, ["data"]);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : vue.createCommentVNode("v-if", true),
              props.isLandlord && vue.unref(length) > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "show_more",
                onClick: addMore
              }, [
                !isShowMore.value ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  { key: 0 },
                  " 展开" + vue.toDisplayString(vue.unref(length)) + "条信息 ",
                  1
                  /* TEXT */
                )) : (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, [
                  vue.unref(nowShowLength) < vue.unref(length) ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "展开更多信息")) : vue.createCommentVNode("v-if", true)
                ]))
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ])
        ]);
      };
    }
  };
  const Landlord = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-8ae1c494"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/datingCircle/Landlord.vue"]]);
  const _sfc_main$i = {
    setup() {
      const useDatingCircleStore = datingCircleStore();
      const {
        proxy
      } = vue.getCurrentInstance();
      let statusBarHeight = vue.ref();
      let length = vue.ref(0);
      let page = vue.ref(1);
      const landlordData = vue.ref([]);
      personStore();
      statusBarHeight.value = uni.getSystemInfoSync()["statusBarHeight"];
      statusBarHeight.value = statusBarHeight.value + 50;
      const getLandlord = () => {
        uni.request({
          method: "GET",
          url: `${proxy.baseUrl}/landlord`,
          data: {
            page: page.value
          },
          success(res) {
            length.value = res.data.length;
            landlordData.value = [...landlordData.value, ...res.data.data];
            page.value++;
          }
        });
      };
      getLandlord();
      if (useDatingCircleStore.isPublishLandlord) {
        getLandlord();
        useDatingCircleStore.isPublishLandlord = false;
      }
      return {
        useDatingCircleStore,
        statusBarHeight,
        landlordData,
        length,
        page,
        getLandlord
      };
    },
    components: {
      navBarBatingCircle,
      Landlord,
      Publish
    },
    onReachBottom() {
      if (this.landlordData.length < this.length) {
        this.getLandlord();
      } else {
        return uni.showToast({
          title: "暂时没有更多数据了~"
        });
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navBarBatingCircle = vue.resolveComponent("navBarBatingCircle");
    const _component_Landlord = vue.resolveComponent("Landlord");
    const _component_Publish = vue.resolveComponent("Publish");
    const _component_tabBar = resolveEasycom(vue.resolveDynamicComponent("tabBar"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "dating_circle_container" }, [
      vue.createVNode(_component_navBarBatingCircle, {
        margin_height: $setup.statusBarHeight,
        nav_text: "谈论圈",
        right_text: "发布",
        img_url: "@/static/images/publish.png"
      }, null, 8, ["margin_height"]),
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($setup.landlordData, (item, index) => {
          return vue.openBlock(), vue.createBlock(_component_Landlord, {
            image_width: 100,
            image_height: 100,
            isLandlord: true,
            margin_left: 0,
            font_style: 900,
            data: item,
            key: index
          }, null, 8, ["data"]);
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      $setup.useDatingCircleStore.isShowPublish ? (vue.openBlock(), vue.createBlock(_component_Publish, { key: 0 })) : vue.createCommentVNode("v-if", true),
      vue.createVNode(_component_tabBar, { propsIndex: 3 })
    ]);
  }
  const PagesDatingCirclesDatingCircles = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$a], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/datingCircles/datingCircles.vue"]]);
  const _imports_0$3 = "/static/images/subtract.png";
  const _imports_1$3 = "/static/images/add.png";
  const _sfc_main$h = {
    __name: "CollectionEquipment",
    props: {
      equipment: {
        type: Object,
        require: true
      },
      style_width: {
        type: Number || String,
        default: 50
      },
      style_height: {
        type: Number || String,
        default: 250
      },
      url: String
    },
    setup(__props) {
      const props = __props;
      const useCollectCartStore = collectCartStore();
      const num = vue.ref(0);
      const changeChecked = () => {
        if (useCollectCartStore.clickList.idList.includes(props.equipment.id)) {
          const index = useCollectCartStore.clickList.idList.indexOf(props.equipment.id);
          useCollectCartStore.clickList.idList.splice(index, 1);
          useCollectCartStore.clickList.payNameList.splice(index, 1);
          useCollectCartStore.clickList.numList.splice(index, 1);
          useCollectCartStore.clickList.prices.splice(index, 1);
        } else {
          useCollectCartStore.clickList.idList.push(props.equipment.id);
          useCollectCartStore.clickList.prices.push(props.equipment.price);
          useCollectCartStore.clickList.payNameList.push(props.equipment.name);
          useCollectCartStore.clickList.numList.push(num.value);
        }
      };
      const sub = () => {
        num.value--;
        const index = useCollectCartStore.clickList.idList.indexOf(props.equipment.id);
        useCollectCartStore.clickList.numList[index] = num.value;
      };
      const add = () => {
        num.value < props.equipment.restNum ? num.value++ : "";
        const index = useCollectCartStore.clickList.idList.indexOf(props.equipment.id);
        useCollectCartStore.clickList.numList[index] = num.value;
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "equipment_container",
            style: vue.normalizeStyle({ height: +__props.style_height + "rpx", width: +__props.style_width + "%" })
          },
          [
            vue.unref(useCollectCartStore).isShowOprate ? (vue.openBlock(), vue.createElementBlock("radio", {
              key: 0,
              checked: vue.unref(useCollectCartStore).clickList.idList.includes(__props.equipment.id),
              onClick: changeChecked
            }, null, 8, ["checked"])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "image" }, [
              vue.createElementVNode("image", {
                src: __props.equipment.imageUrl,
                mode: ""
              }, null, 8, ["src"])
            ]),
            vue.createElementVNode("view", { class: "right" }, [
              vue.createElementVNode("view", { class: "information" }, [
                vue.createElementVNode(
                  "view",
                  { class: "name" },
                  " 名字:" + vue.toDisplayString(__props.equipment.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "type" },
                  " 种类:" + vue.toDisplayString(__props.equipment.type),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "price" },
                  " 单价:" + vue.toDisplayString(__props.equipment.price),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "unit" },
                  " 计费方式:" + vue.toDisplayString(__props.equipment.unit),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "rest_num" },
                  " 剩余:" + vue.toDisplayString(__props.equipment.restNum),
                  1
                  /* TEXT */
                )
              ]),
              vue.unref(useCollectCartStore).isShowOprate ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "equipment_num"
              }, [
                vue.createElementVNode("view", {
                  class: "sub",
                  onClick: sub
                }, [
                  num.value > 0 ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    src: _imports_0$3,
                    mode: ""
                  })) : vue.createCommentVNode("v-if", true)
                ]),
                vue.createElementVNode(
                  "view",
                  { class: "num" },
                  vue.toDisplayString(num.value),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", {
                  class: "add",
                  onClick: add
                }, [
                  vue.createElementVNode("image", {
                    src: _imports_1$3,
                    mode: ""
                  })
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const CollectionEquipment = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-564bb798"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/common/CollectionEquipment.vue"]]);
  const _imports_0$2 = "/static/images/publish.png";
  const _imports_1$2 = "/static/images/cancle.png";
  const _sfc_main$g = {
    __name: "navBarCollectCart",
    props: {
      margin_height: {
        type: Number,
        default: 50
      },
      nav_text: {
        type: String,
        default: "收藏夹"
      },
      right_text: {
        type: String,
        default: "管理"
      }
    },
    setup(__props) {
      const useCollectCartStore = collectCartStore();
      const back = () => {
        uni.navigateBack();
      };
      const change_cart = () => {
        useCollectCartStore.isShowOprate = !useCollectCartStore.isShowOprate;
        if (!useCollectCartStore.isShowOprate) {
          useCollectCartStore.clickList = {
            idList: [],
            payNameList: [],
            numList: [],
            prices: []
          };
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "top",
            style: vue.normalizeStyle({ "margin-top": __props.margin_height + "rpx" })
          },
          [
            vue.createElementVNode("view", {
              class: "back",
              onClick: back
            }, [
              vue.createElementVNode("image", {
                src: "/static/images/back.png",
                mode: ""
              })
            ]),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString(__props.nav_text),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", {
              class: "right",
              onClick: change_cart
            }, [
              !vue.unref(useCollectCartStore).isShowOprate ? (vue.openBlock(), vue.createElementBlock(
                "text",
                { key: 0 },
                vue.toDisplayString(__props.right_text),
                1
                /* TEXT */
              )) : (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, "取消")),
              !vue.unref(useCollectCartStore).isShowOprate ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 2,
                src: _imports_0$2,
                mode: ""
              })) : (vue.openBlock(), vue.createElementBlock("image", {
                key: 3,
                src: _imports_1$2,
                mode: ""
              }))
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  };
  const navBarCollectCart = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-5455963c"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/navBar/navBarCollectCart.vue"]]);
  const _sfc_main$f = {
    setup() {
      const useCollectCartStore = collectCartStore();
      const usePersonStore = personStore();
      let statusBarHeight = vue.ref();
      const {
        proxy
      } = vue.getCurrentInstance();
      uni.request({
        method: "POST",
        url: `${proxy.baseUrl}/validate`,
        // uni.setStorageSync('authorization', res.data.token);
        header: {
          authorization: usePersonStore.authorization
        },
        data: {
          phone: usePersonStore.personData.phone
        },
        success(res) {
          if (res.data.code == 401) {
            uni.navigateTo({
              url: "/pages/login/login"
            });
          } else if (res.data.code == 200) {
            usePersonStore.authorization = res.data.token;
          }
        }
      });
      const init = (id) => {
        if (id === void 0)
          return;
        uni.request({
          method: "GET",
          url: `${proxy.baseUrl}/getCart`,
          data: {
            id
          },
          success(res) {
            useCollectCartStore.selectIdList = res.data.selectId;
            useCollectCartStore.selectEquipmentList = res.data.data;
          }
        });
      };
      const selectAll = () => {
        useCollectCartStore.clickList.idList = useCollectCartStore.selectEquipmentList.map((item, index) => item.id);
        useCollectCartStore.clickList.idList.forEach((item, index) => {
          const detail = useCollectCartStore.selectEquipmentList.filter((equipment) => item == equipment.id);
          useCollectCartStore.clickList.payNameList.push(detail[0].name);
          useCollectCartStore.clickList.prices.push(detail[0].price);
          useCollectCartStore.clickList.numList.push(0);
        });
      };
      const deleteSelect = () => {
        uni.request({
          method: "DELETE",
          url: `${proxy.baseUrl}/delete/cartEquipment`,
          data: {
            user_id: usePersonStore.personData.id,
            equipments: useCollectCartStore.clickList.idList
          },
          success(res) {
            res.data.code == 0 ? uni.showToast({
              title: `${res.data.message}`
            }) : "";
            useCollectCartStore.isShowOprate = false;
            useCollectCartStore.clickList = {
              idList: [],
              payNameList: [],
              numList: [],
              prices: []
            };
            uni.navigateTo({
              url: "/pages/sportCart/sportCart"
            });
          }
        });
      };
      const submit = () => {
        uni.request({
          method: "POST",
          url: `${proxy.baseUrl}/create/order`,
          data: {
            user_id: usePersonStore.personData.id,
            phone: usePersonStore.personData.phone,
            payName: useCollectCartStore.clickList.payNameList.join("-"),
            nums: useCollectCartStore.clickList.numList.join("-"),
            prices: useCollectCartStore.clickList.prices.join("-"),
            ids: useCollectCartStore.clickList.idList.join("-")
          },
          success(res) {
            uni.showToast({
              title: `${res.data.message}`
            });
            useCollectCartStore.isShowOprate = false;
            useCollectCartStore.clickList = {
              idList: [],
              payNameList: [],
              numList: [],
              prices: []
            };
            init(usePersonStore.personData.id);
          }
        });
      };
      init(usePersonStore.personData.id);
      statusBarHeight.value = uni.getSystemInfoSync()["statusBarHeight"];
      statusBarHeight.value = statusBarHeight.value + 50;
      return {
        useCollectCartStore,
        usePersonStore,
        init,
        selectAll,
        deleteSelect,
        submit
      };
    },
    components: {
      CollectionEquipment,
      navBarCollectCart
    },
    onLoad() {
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navBarCollectCart = vue.resolveComponent("navBarCollectCart");
    const _component_CollectionEquipment = vue.resolveComponent("CollectionEquipment");
    const _component_tabBar = resolveEasycom(vue.resolveDynamicComponent("tabBar"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "collect_container" }, [
          vue.createCommentVNode(' <image src="../static/images/6970d3ed573a1bb758d67a2f44ad16cd" mode=""></image> '),
          vue.createVNode(_component_navBarCollectCart),
          vue.createElementVNode("scroll-view", {
            class: "scroll_view",
            "scroll-y": "true"
          }, [
            $setup.useCollectCartStore.selectEquipmentList.length > 0 ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList($setup.useCollectCartStore.selectEquipmentList, (item, index) => {
                return vue.openBlock(), vue.createBlock(_component_CollectionEquipment, {
                  equipment: item,
                  key: index,
                  style_width: 1e3
                }, null, 8, ["equipment"]);
              }),
              128
              /* KEYED_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "null"
            }, [
              vue.createElementVNode("text", null, "啊哦~亲，暂无收藏，请前往租借室前往收藏吧!"),
              vue.createElementVNode("image", {
                src: "/static/images/no_collect.png",
                mode: ""
              })
            ]))
          ])
        ]),
        vue.createElementVNode("view", null, [
          $setup.useCollectCartStore.isShowOprate ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "operate"
          }, [
            vue.createElementVNode("view", {
              class: "all",
              onClick: _cache[0] || (_cache[0] = (...args) => $setup.selectAll && $setup.selectAll(...args))
            }, " 全部选择 "),
            vue.createElementVNode("view", {
              class: "delete",
              onClick: _cache[1] || (_cache[1] = (...args) => $setup.deleteSelect && $setup.deleteSelect(...args))
            }, " 删除 "),
            vue.createElementVNode("view", {
              class: "create_order",
              onClick: _cache[2] || (_cache[2] = (...args) => $setup.submit && $setup.submit(...args))
            }, " 生成订单 ")
          ])) : vue.createCommentVNode("v-if", true),
          vue.createVNode(_component_tabBar, { propsIndex: 1 })
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesSportCartSportCart = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$9], ["__scopeId", "data-v-809b20f8"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/sportCart/sportCart.vue"]]);
  const _sfc_main$e = {
    data() {
      return {};
    },
    props: {
      line_color: {
        type: String,
        default: "red"
      },
      line_width: {
        type: String,
        default: "2rpx"
      },
      line_style: {
        type: String,
        default: "solid"
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "line",
        style: vue.normalizeStyle({ "border-color": this.line_color, "border-width": this.line_width, "border-style": this.line_style })
      },
      null,
      4
      /* STYLE */
    );
  }
  const Line = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$8], ["__scopeId", "data-v-c929473b"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/common/Line.vue"]]);
  const _sfc_main$d = {
    setup() {
      const {
        proxy
      } = vue.getCurrentInstance();
      const phone = vue.ref("");
      const password = vue.ref("");
      const localPhone = uni.getStorageSync("phone");
      const localPassword = uni.getStorageSync("password");
      if (localPhone != void 0) {
        phone.value = localPhone;
      }
      if (localPassword != void 0) {
        password.value = localPassword;
      }
      const usePersonStore = personStore();
      const useCollectCartStore = collectCartStore();
      const goRegistry = () => {
        uni.navigateTo({
          url: "/pages/registry/registry"
        });
      };
      const goFindPwd = () => {
        uni.navigateTo({
          url: "/pages/findPwd/findPwd"
        });
      };
      const login = () => {
        uni.request({
          method: "POST",
          url: `${proxy.baseUrl}/login`,
          data: {
            phone: phone.value,
            password: password.value
          },
          success(res) {
            if (res.data.code == 0) {
              uni.navigateBack({
                delta: 1,
                animationType: "pop-in",
                animationDuration: 1e3,
                success() {
                  usePersonStore.personData = res.data.data;
                  usePersonStore.authorization = res.data.token;
                  uni.setStorageSync("phone", phone.value);
                  uni.setStorageSync("password", password.value);
                  uni.showToast({
                    title: `${res.data.message}`
                  });
                  uni.request({
                    method: "GET",
                    url: `${proxy.baseUrl}/order`,
                    data: {
                      user_id: usePersonStore.personData.id
                    },
                    success(res2) {
                      usePersonStore.fullPayList = res2.data.fullPayList;
                      usePersonStore.partPayList = res2.data.partPayList;
                    }
                  });
                  uni.request({
                    method: "GET",
                    url: `${proxy.baseUrl}/getCart`,
                    data: {
                      id: usePersonStore.personData.id
                    },
                    success(res2) {
                      useCollectCartStore.selectIdList = res2.data.selectId;
                      useCollectCartStore.selectEquipmentList = res2.data.data;
                    }
                  });
                  uni.request({
                    method: "GET",
                    url: `${proxy.baseUrl}/user/another`,
                    data: {
                      id: usePersonStore.personData.id
                    },
                    success(res2) {
                      usePersonStore.anotherData = res2.data.data;
                    }
                  });
                }
              });
            } else {
              uni.showModal({
                title: "温馨提示,请联系管理员",
                content: `${res.data.message}`
              });
            }
          }
        });
      };
      const vxLogin = () => {
        uni.login({
          provider: "weixin",
          success: function(loginRes) {
            formatAppLog("log", "at pages/login/login.vue:144", loginRes);
            formatAppLog("log", "at pages/login/login.vue:145", loginRes.authResult);
            uni.getUserInfo({
              provider: "weixin",
              success: function(infoRes) {
                formatAppLog("log", "at pages/login/login.vue:150", infoRes);
                formatAppLog("log", "at pages/login/login.vue:151", "用户昵称为：" + infoRes.userInfo.nickName);
              }
            });
          }
        });
      };
      return {
        phone,
        password,
        goRegistry,
        goFindPwd,
        localPhone,
        localPassword,
        login,
        usePersonStore,
        vxLogin
      };
    },
    components: {
      LineLine: Line
    },
    onLoad() {
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_LineLine = vue.resolveComponent("LineLine");
    return vue.openBlock(), vue.createElementBlock("view", { class: "login_container" }, [
      vue.createElementVNode("view", { class: "title" }, " 轻量级共享健身 "),
      vue.createCommentVNode(' :v-model="localPhone!=undefined ?localPhone:phone" '),
      vue.createElementVNode("view", { class: "common" }, [
        vue.createElementVNode("text", null, "手机号:"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            type: "tel",
            name: "tel",
            id: "tel",
            placeholder: "请输入11位手机号",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.phone = $event),
            "placeholder-style": "color:grey"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.phone]
        ])
      ]),
      vue.createCommentVNode(' :v-model="localPassword!=undefined ?localPassword:password" '),
      vue.createElementVNode("view", { class: "common" }, [
        vue.createElementVNode("text", null, "密    码:"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            type: "password",
            name: "pwd",
            id: "pwd",
            placeholder: "请输入登录密码",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.password = $event),
            "placeholder-style": "color:grey"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.password]
        ])
      ]),
      vue.createVNode(_component_LineLine),
      vue.createElementVNode("view", { class: "user_another" }, [
        vue.createCommentVNode(" 两个链接，跳转界面 "),
        vue.createElementVNode("view", {
          class: "",
          onClick: _cache[2] || (_cache[2] = (...args) => $setup.goRegistry && $setup.goRegistry(...args))
        }, [
          vue.createElementVNode("text", null, "没有账号?立即注册")
        ]),
        vue.createElementVNode("view", {
          class: "",
          onClick: _cache[3] || (_cache[3] = (...args) => $setup.goFindPwd && $setup.goFindPwd(...args))
        }, [
          vue.createElementVNode("text", null, "忘记密码?立即找回")
        ])
      ]),
      vue.createVNode(_component_LineLine, { line_color: "blue" }),
      vue.createElementVNode("view", null, [
        vue.createElementVNode("h2", { id: "h2" }, "其它方式登录"),
        vue.createElementVNode("image", {
          id: "vx_login",
          src: "/static/images/vxLogin.png",
          onClick: _cache[4] || (_cache[4] = (...args) => $setup.vxLogin && $setup.vxLogin(...args))
        })
      ]),
      vue.createElementVNode("button", {
        type: "primary",
        onClick: _cache[5] || (_cache[5] = (...args) => $setup.login && $setup.login(...args))
      }, "登录")
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$7], ["__scopeId", "data-v-e4e4508d"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/login/login.vue"]]);
  const _sfc_main$c = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesConfirmConfirm = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$6], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/confirm/confirm.vue"]]);
  const _sfc_main$b = {
    __name: "payment",
    setup(__props) {
      const usePersonStore = personStore();
      const {
        proxy
      } = vue.getCurrentInstance();
      uni.request({
        method: "PUT",
        url: `${proxy.baseUrl}/return/order`,
        data: {
          id: usePersonStore.partPayList[0].id,
          user_id: usePersonStore.personData.id,
          payTime: usePersonStore.partPayList[0].payTime,
          prices: usePersonStore.partPayList[0].prices,
          nums: usePersonStore.partPayList[0].nums,
          idList: usePersonStore.partPayList[0].idList
        },
        success(result) {
          uni.request({
            method: "GET",
            url: `${proxy.baseUrl}/order`,
            data: {
              user_id: usePersonStore.personData.id
            },
            success(res) {
              usePersonStore.fullPayList = res.data.fullPayList;
              usePersonStore.partPayList = res.data.partPayList;
            }
          });
          uni.request({
            method: "GET",
            url: `${proxy.baseUrl}/get`,
            data: {
              id: usePersonStore.personData.id
            },
            success(res) {
              usePersonStore.personData = res.data.data;
              uni.showModal({
                title: "温馨提示,点击确定1秒返回租借室,您可以回到历史界面，查看信息",
                content: `${result.data.message}`,
                success() {
                  setTimeout(() => {
                    uni.navigateTo({
                      url: "/pages/sportShop/sportShop"
                    });
                  }, 1e3);
                }
              });
            }
          });
        }
      });
      return (_ctx, _cache) => {
        return null;
      };
    }
  };
  const PagesPaymentPayment = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "D:/Front-end/uni-app/uni-project/app/pages/payment/payment.vue"]]);
  const _imports_0$1 = "/static/images/vxPay.png";
  const _imports_1$1 = "/static/images/aliPay.png";
  const _sfc_main$a = {
    __name: "paymentMethods",
    setup(__props) {
      const pay = () => {
        uni.navigateTo({
          url: "/pages/payment/payment"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", { class: "warn" }, " 请选择下列支付方式 "),
          vue.createElementVNode("radio-group", null, [
            vue.createElementVNode("view", { class: "vx common" }, [
              vue.createElementVNode("image", {
                src: _imports_0$1,
                mode: ""
              }),
              vue.createElementVNode("text", null, "微信"),
              vue.createElementVNode("radio")
            ]),
            vue.createElementVNode("view", { class: "ali common" }, [
              vue.createElementVNode("image", {
                src: _imports_1$1,
                mode: ""
              }),
              vue.createElementVNode("text", null, "支付宝"),
              vue.createElementVNode("radio")
            ])
          ]),
          vue.createElementVNode("view", {
            class: "pay",
            onClick: pay
          }, " 去支付 ")
        ]);
      };
    }
  };
  const PagesPaymentMethodsPaymentMethods = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-1b4590e3"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/paymentMethods/paymentMethods.vue"]]);
  const _sfc_main$9 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesAccountAccount = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$5], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/account/account.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesPaySuccessPaySuccess = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$4], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/paySuccess/paySuccess.vue"]]);
  const _sfc_main$7 = {
    __name: "TextCard",
    props: {
      text: {
        type: String || Number,
        default: "猜你喜欢"
      },
      color: {
        type: String,
        default: "#ccc"
      }
    },
    setup(__props) {
      const props = __props;
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "text_container" }, [
          vue.createElementVNode("text", { class: "" }, " -- "),
          vue.createElementVNode(
            "text",
            {
              style: vue.normalizeStyle({ color: props.color })
            },
            vue.toDisplayString(props.text),
            5
            /* TEXT, STYLE */
          ),
          vue.createElementVNode("text", { class: "" }, " -- ")
        ]);
      };
    }
  };
  const TextCard = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-0f0a1fd2"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/common/TextCard.vue"]]);
  const _imports_0 = "/static/images/collect.png";
  const _imports_1 = "/static/images/collect_active.png";
  const _sfc_main$6 = {
    setup() {
      const {
        proxy
      } = vue.getCurrentInstance();
      let equipment = vue.reactive({});
      let style_width = 800;
      let data = vue.ref([]);
      let page = vue.ref(1);
      let totalLength = vue.ref();
      const useCollectCartStore = collectCartStore();
      const useDetailCartStore = detailCartStore();
      const usePersonStore = personStore();
      equipment = useDetailCartStore.detail;
      function operate() {
        uni.request({
          method: "POST",
          url: `${proxy.baseUrl}/validate`,
          header: {
            authorization: usePersonStore.authorization
          },
          data: {
            phone: usePersonStore.personData.phone
          },
          success(res) {
            if (res.data.code == 401) {
              uni.navigateTo({
                url: "/pages/login/login"
              });
            } else if (res.data.code == 200) {
              usePersonStore.authorization = res.data.token;
              uni.request({
                url: `${proxy.baseUrl}/changeCart`,
                method: "POST",
                data: {
                  user_id: usePersonStore.personData.id,
                  equ_id: equipment.id
                },
                success() {
                  uni.request({
                    method: "GET",
                    url: `${proxy.baseUrl}/getCart`,
                    data: {
                      id: usePersonStore.personData.id
                    },
                    success(res2) {
                      useCollectCartStore.selectIdList = res2.data.selectId;
                      useCollectCartStore.selectEquipmentList = res2.data.data;
                    }
                  });
                }
              });
            }
          }
        });
      }
      function getMore() {
        uni.request({
          method: "GET",
          url: `${proxy.baseUrl}/random`,
          data: {
            page: page.value
          },
          success(res) {
            totalLength.value = res.data.length;
            data.value = [...data.value, ...res.data.data];
            page.value++;
          }
        });
      }
      function goDetail(item) {
        useDetailCartStore.detail = item;
        uni.navigateTo({
          url: `/pages/details/details`
        });
      }
      function goCollectUrl() {
        uni.request({
          method: "POST",
          url: `${proxy.baseUrl}/validate`,
          header: {
            authorization: usePersonStore.authorization
          },
          data: {
            phone: usePersonStore.personData.phone
          },
          success(res) {
            if (res.data.code == 401) {
              uni.navigateTo({
                url: "/pages/login/login"
              });
            } else if (res.data.code == 200) {
              usePersonStore.authorization = res.data.token;
              uni.navigateTo({
                url: "/pages/sportCart/sportCart"
              });
            }
          }
        });
      }
      getMore();
      return {
        useCollectCartStore,
        useDetailCartStore,
        equipment,
        style_width,
        totalLength,
        data,
        operate,
        getMore,
        goDetail,
        goCollectUrl
      };
    },
    components: {
      TextCard,
      EquipmentCard
    },
    onLoad() {
    },
    onReachBottom() {
      if (this.data.length < this.totalLength) {
        this.getMore();
      } else {
        uni.showToast({
          title: "暂无更多数据~"
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TextCard = vue.resolveComponent("TextCard");
    const _component_EquipmentCard = vue.resolveComponent("EquipmentCard");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "details_container" }, [
          vue.createElementVNode("view", { class: "image" }, [
            vue.createElementVNode("image", {
              src: $setup.equipment.imageUrl,
              mode: ""
            }, null, 8, ["src"])
          ]),
          vue.createElementVNode("view", { class: "equipment_information" }, [
            vue.createElementVNode("view", { class: "name" }, [
              vue.createElementVNode("text", { class: "common_left_text" }, "名字:"),
              vue.createTextVNode(),
              vue.createElementVNode(
                "text",
                { class: "common_right_text" },
                vue.toDisplayString($setup.equipment.name),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "type" }, [
              vue.createElementVNode("text", { class: "common_left_text" }, "类型:"),
              vue.createTextVNode(),
              vue.createElementVNode(
                "text",
                { class: "common_right_text" },
                vue.toDisplayString($setup.equipment.type),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "price" }, [
              vue.createElementVNode("text", { class: "common_left_text" }, "单价:"),
              vue.createTextVNode(),
              vue.createElementVNode(
                "text",
                { class: "common_right_text" },
                vue.toDisplayString($setup.equipment.price),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "unit" }, [
              vue.createElementVNode("text", { class: "common_left_text" }, "计费方式:"),
              vue.createTextVNode(),
              vue.createElementVNode(
                "text",
                { class: "common_right_text" },
                vue.toDisplayString($setup.equipment.unit),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "rest" }, [
              vue.createElementVNode("text", { class: "common_left_text" }, "剩余数量:"),
              vue.createTextVNode(),
              vue.createElementVNode(
                "text",
                { class: "common_right_text" },
                vue.toDisplayString($setup.equipment.restNum),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "description" }, [
              vue.createElementVNode("text", { class: "common_left_text" }, "介绍:"),
              vue.createTextVNode(),
              vue.createElementVNode(
                "text",
                { class: "common_right_text" },
                vue.toDisplayString($setup.equipment.description),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode("view", { class: "bottom" }, [
            vue.createElementVNode("view", {
              class: "addCart",
              onClick: _cache[0] || (_cache[0] = (...args) => $setup.operate && $setup.operate(...args))
            }, [
              vue.createCommentVNode(" 未添加 "),
              !$setup.useCollectCartStore.selectIdList.includes($setup.equipment.id) ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createElementVNode("view", { class: "" }, " 点击加入收藏夹 "),
                  vue.createElementVNode("image", {
                    src: _imports_0,
                    mode: ""
                  })
                ],
                64
                /* STABLE_FRAGMENT */
              )) : (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 1 },
                [
                  vue.createElementVNode("view", { class: "goCart_text" }, " 取消加入收藏夹 "),
                  vue.createElementVNode("image", {
                    src: _imports_1,
                    mode: ""
                  })
                ],
                64
                /* STABLE_FRAGMENT */
              ))
            ]),
            vue.createCommentVNode(" 去收藏夹结算 "),
            vue.createElementVNode("view", {
              class: "goCart",
              onClick: _cache[1] || (_cache[1] = (...args) => $setup.goCollectUrl && $setup.goCollectUrl(...args))
            }, [
              vue.createElementVNode("view", { class: "goCart_text" }, " 前往收藏夹结算 "),
              vue.createElementVNode("image", {
                src: "/static/tab_icons/cart.png",
                mode: ""
              })
            ])
          ])
        ]),
        vue.createVNode(_component_TextCard, { color: "red" }),
        vue.createElementVNode("view", { class: "recommend" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.data, (item, index) => {
              return vue.openBlock(), vue.createBlock(_component_EquipmentCard, {
                equipment: item,
                style_width: $setup.style_width,
                key: index,
                onClick: ($event) => $setup.goDetail(item)
              }, null, 8, ["equipment", "style_width", "onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesDetailsDetails = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$3], ["__scopeId", "data-v-4b799d2f"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/details/details.vue"]]);
  const _sfc_main$5 = {
    setup() {
      const {
        proxy
      } = vue.getCurrentInstance();
      const verificationCode = vue.ref("");
      const phone = vue.ref("");
      const password = vue.ref("");
      const re_password = vue.ref("");
      const btnMessage = vue.ref("点击发送");
      const isConfirm = vue.ref(false);
      const usePersonStore = personStore();
      const submitPhone = () => {
        if (isConfirm.value) {
          if (password.value == "" || re_password.value == "") {
            uni.showToast({
              title: "密码不能为空",
              icon: "error"
            });
            return;
          }
          if (password.value != re_password.value) {
            uni.showToast({
              title: "密码输入不正确",
              icon: "error"
            });
            return;
          } else {
            uni.request({
              method: "POST",
              url: `${proxy.baseUrl}/register/phone`,
              data: {
                verificationCode: verificationCode.value,
                phone: phone.value,
                password: password.value
              },
              success(res) {
                uni.showModal({
                  title: "提示",
                  content: "注册成功,点击确认前往登录界面",
                  showCancel: false,
                  success: function(res2) {
                    if (res2.confirm) {
                      uni.navigateTo({
                        url: "/pages/login/login"
                      });
                    }
                  }
                });
              }
            });
          }
        } else {
          uni.showModal({
            title: "提示",
            content: `请先发送验证码`,
            showCancel: false,
            success: function(res) {
              if (res.confirm)
                ;
            }
          });
        }
      };
      let timer = null;
      let time = vue.ref(5);
      let timer1 = null;
      let flag = true;
      const getVerificationCode = (wait = 500) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (flag) {
            flag = false;
            uni.request({
              method: "POST",
              url: `${proxy.baseUrl}/send/phone`,
              data: {
                phone: phone.value
              },
              success(res) {
                uni.showModal({
                  title: "提示",
                  content: `${res.data.message}`,
                  showCancel: false,
                  success: function(res2) {
                    if (res2.confirm) {
                      isConfirm.value = true;
                    }
                  }
                });
              }
            });
            timer1 = setInterval(() => {
              time.value = time.value - 1;
              btnMessage.value = `${time.value}秒后重发`;
              if (time.value == 0) {
                clearInterval(timer1);
                btnMessage.value = `点击重发`;
                flag = true;
                time.value = 5;
              }
            }, 1e3);
          }
        }, wait);
      };
      return {
        phone,
        password,
        re_password,
        btnMessage,
        verificationCode,
        usePersonStore,
        submitPhone,
        getVerificationCode
      };
    },
    onLoad() {
    },
    components: {
      Line
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Line = vue.resolveComponent("Line");
    return vue.openBlock(), vue.createElementBlock("view", { class: "registry_center" }, [
      vue.createElementVNode("view", { class: "top" }, [
        vue.createElementVNode("view", { class: "top_phone" }, [
          vue.createElementVNode("text", null, "请输入手机号:"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              type: "tel",
              maxlength: 11,
              class: "tel",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.phone = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.phone]
          ])
        ]),
        vue.createElementVNode(
          "view",
          {
            class: "submit",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.getVerificationCode(1e3))
          },
          vue.toDisplayString($setup.btnMessage),
          1
          /* TEXT */
        )
      ]),
      vue.createVNode(_component_Line, { class: "margin_top" }),
      vue.createElementVNode("view", { class: "vertify" }, [
        vue.createElementVNode("text", null, "请输入验证码:"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "code",
            type: "number",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.verificationCode = $event)
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.verificationCode]
        ])
      ]),
      vue.createVNode(_component_Line, {
        class: "margin_top",
        line_color: "skyblue"
      }),
      vue.createElementVNode("view", { class: "" }, [
        vue.createElementVNode("view", { class: "common" }, [
          vue.createElementVNode("text", null, "请输入登录密码:"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "ipt",
              password: "",
              type: "text",
              placeholder: "请输入登录密码",
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.password = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.password]
          ])
        ]),
        vue.createElementVNode("view", { class: "common" }, [
          vue.createElementVNode("text", null, "请确认登录密码:"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "ipt",
              password: "",
              type: "text",
              placeholder: "请确认登录密码",
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.re_password = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.re_password]
          ])
        ]),
        vue.createVNode(_component_Line, {
          class: "margin_top",
          line_color: "#ccc"
        }),
        vue.createElementVNode("view", {
          class: "submit",
          onClick: _cache[5] || (_cache[5] = (...args) => $setup.submitPhone && $setup.submitPhone(...args))
        }, " 点击注册 ")
      ])
    ]);
  }
  const PagesRegistryRegistry = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$2], ["__scopeId", "data-v-4420ee1d"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/registry/registry.vue"]]);
  const _sfc_main$4 = {
    setup() {
      const usePersonStore = personStore();
      const {
        proxy
      } = vue.getCurrentInstance();
      const phone = vue.ref("");
      const email = vue.ref("");
      const getPwd = () => {
        if (phone.value == "" || email.value == "") {
          uni.showToast({
            title: "手机号码或者邮箱不能为空",
            icon: "error"
          });
          return;
        } else {
          uni.request({
            method: "POST",
            url: `${proxy.baseUrl}/find/pwd`,
            data: {
              phone: phone.value,
              email: email.value
            },
            success(res) {
              uni.showModal({
                title: "提示",
                content: `${res.data.message}，点击确认前往登录界面`,
                showCancel: false,
                success: function(res2) {
                  if (res2.confirm) {
                    uni.navigateTo({
                      url: "/pages/login/login"
                    });
                  }
                }
              });
            }
          });
        }
      };
      return {
        phone,
        email,
        getPwd,
        usePersonStore
      };
    },
    onLoad() {
    },
    components: {
      Line
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Line = vue.resolveComponent("Line");
    return vue.openBlock(), vue.createElementBlock("view", { class: "findPwd_center" }, [
      vue.createElementVNode("view", { class: "common" }, [
        vue.createElementVNode("text", null, "请输入手机号码:"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "ipt",
            type: "tel",
            placeholder: "请输入手机号码",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.phone = $event)
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.phone]
        ])
      ]),
      vue.createElementVNode("view", { class: "common" }, [
        vue.createElementVNode("text", null, "请输入邮箱账号:"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "ipt",
            type: "text",
            placeholder: "请输入邮箱账号",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.email = $event)
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.email]
        ])
      ]),
      vue.createVNode(_component_Line, {
        class: "margin_top",
        line_color: "#cb2d01"
      }),
      vue.createElementVNode("view", {
        class: "submit",
        onClick: _cache[2] || (_cache[2] = (...args) => $setup.getPwd && $setup.getPwd(...args))
      }, " 点击发送 ")
    ]);
  }
  const PagesFindPwdFindPwd = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$1], ["__scopeId", "data-v-60183a10"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/findPwd/findPwd.vue"]]);
  const _sfc_main$3 = {
    __name: "search",
    setup(__props) {
      personStore();
      const useDetailCartStore = detailCartStore();
      const {
        proxy
      } = vue.getCurrentInstance();
      const data = vue.ref([]);
      const ipt = vue.ref("");
      const search = () => {
        uni.request({
          method: "GET",
          url: `${proxy.baseUrl}/search`,
          data: {
            name: ipt.value
          },
          success(res) {
            res.data.code == 0 ? data.value = res.data.data : uni.showToast({
              title: `${res.data.message}`
            });
          }
        });
      };
      const goDetail = (equipment) => {
        useDetailCartStore.detail = equipment;
        uni.navigateTo({
          url: `/pages/details/details`
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "search_container" }, [
          vue.createElementVNode("view", { class: "search_top" }, [
            vue.createElementVNode("image", {
              class: "search_image",
              src: "/static/images/search.png",
              mode: ""
            }),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "search_ipt",
                type: "text",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => ipt.value = $event),
                placeholder: "宁可少输,也别打错"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, ipt.value]
            ]),
            vue.createElementVNode("view", {
              class: "search_click",
              onClick: search
            }, [
              vue.createElementVNode("text", null, "搜索")
            ])
          ]),
          vue.createElementVNode("view", { class: "list" }, [
            data.value.length > 0 ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList(data.value, (item, index) => {
                return vue.openBlock(), vue.createBlock(EquipmentCard, {
                  key: index,
                  equipment: item,
                  style_width: 1e3,
                  onClick: ($event) => goDetail(item)
                }, null, 8, ["equipment", "onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ])
        ]);
      };
    }
  };
  const PagesSearchSearch = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c10c040c"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/search/search.vue"]]);
  const _sfc_main$2 = {};
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "mask" }, [
      vue.createElementVNode("view", { class: "container" }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode("text", null, "暂无内容")
        ], true)
      ])
    ]);
  }
  const Mask = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render], ["__scopeId", "data-v-e33e0205"], ["__file", "D:/Front-end/uni-app/uni-project/app/components/common/Mask.vue"]]);
  const _sfc_main$1 = {
    __name: "set",
    setup(__props) {
      const usePersonStore = personStore();
      const {
        proxy
      } = vue.getCurrentInstance();
      const user = vue.reactive({
        username: "",
        email: "",
        description: "",
        verificationCode: ""
      });
      const showMask = vue.reactive({
        showName: false,
        showEmail: false,
        showDesc: false
      });
      const show = (type) => {
        switch (type) {
          case 1:
            showMask.showName = true;
            break;
          case 2:
            showMask.showDesc = true;
            break;
          case 3:
            showMask.showEmail = true;
            break;
        }
      };
      const cancle = () => {
        showMask.showName = false;
        showMask.showDesc = false;
        showMask.showEmail = false;
      };
      const changeTickname = () => {
        uni.request({
          url: `${proxy.baseUrl}/change/name`,
          method: "PUT",
          data: {
            id: usePersonStore.personData.id,
            username: user.username
          },
          success(res) {
            uni.showToast({
              title: `${res.data.message}`
            });
            uni.request({
              url: `${proxy.baseUrl}/get`,
              data: {
                id: usePersonStore.personData.id
              },
              success(res2) {
                usePersonStore.personData = res2.data.data;
                uni.navigateTo({
                  url: "/pages/my/my"
                });
              }
            });
          }
        });
        showMask.showName = false;
      };
      const changeDesc = () => {
        uni.request({
          url: `${proxy.baseUrl}/change/description`,
          method: "PUT",
          data: {
            id: usePersonStore.personData.id,
            description: user.description
          },
          success(res) {
            uni.showToast({
              title: `${res.data.message}`
            });
            uni.request({
              url: `${proxy.baseUrl}/get`,
              data: {
                id: usePersonStore.personData.id
              },
              success(res2) {
                usePersonStore.personData = res2.data.data;
                uni.navigateTo({
                  url: "/pages/my/my"
                });
              }
            });
          }
        });
        showMask.showDesc = false;
      };
      const getVerificationCode = () => {
        uni.request({
          url: `${proxy.baseUrl}/send/email`,
          method: "POST",
          data: {
            id: usePersonStore.personData.id,
            email: user.email
          },
          success(res) {
            uni.showModal({
              title: `${res.data.message}`
            });
          }
        });
      };
      const submit = () => {
        uni.request({
          url: `${proxy.baseUrl}/register/email`,
          method: "POST",
          data: {
            phone: usePersonStore.personData.phone,
            verificationCode: user.verificationCode
          },
          success(res) {
            uni.showToast({
              title: `${res.data.message}`
            });
            uni.request({
              url: `${proxy.baseUrl}/get`,
              data: {
                id: usePersonStore.personData.id
              },
              success(res2) {
                usePersonStore.personData = res2.data.data;
                uni.showModal({
                  title: `${res2.data.message}`
                });
              }
            });
          }
        });
      };
      const upload = () => {
        uni.chooseImage({
          //选择图片
          count: 1,
          sizeType: ["compressed"],
          success(res) {
            const tempFilePaths = res.tempFilePaths;
            uni.uploadFile({
              //上传代码
              url: `${proxy.baseUrl}/upload/image`,
              //本地node.js服务器地址
              filePath: tempFilePaths[0],
              name: "file",
              formData: {
                //用于给file文件添加额外说明信息
                id: usePersonStore.personData.id
              },
              success: function(res2) {
                uni.showToast({
                  title: `修改头像成功`
                });
                uni.request({
                  url: `${proxy.baseUrl}/get`,
                  data: {
                    id: usePersonStore.personData.id
                  },
                  success(response) {
                    usePersonStore.personData = response.data.data;
                    uni.navigateTo({
                      url: "/pages/my/my"
                    });
                  }
                });
              },
              fail: function(err) {
                formatAppLog("log", "at pages/set/set.vue:238", err);
              }
            });
          }
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "set_container" }, [
              vue.createElementVNode("view", {
                onClick: _cache[0] || (_cache[0] = ($event) => show(1))
              }, [
                vue.createElementVNode("image", {
                  src: "/static/images/nickname.png",
                  mode: ""
                }),
                vue.createElementVNode("text", null, "修改昵称>")
              ]),
              vue.createElementVNode("view", {
                onClick: _cache[1] || (_cache[1] = ($event) => show(2))
              }, [
                vue.createElementVNode("image", {
                  src: "/static/images/description.png",
                  mode: ""
                }),
                vue.createElementVNode("text", null, "修改签名>")
              ]),
              vue.createElementVNode("view", {
                onClick: _cache[2] || (_cache[2] = ($event) => show(3))
              }, [
                vue.createElementVNode("image", {
                  src: "/static/images/email.png",
                  mode: ""
                }),
                vue.createElementVNode("text", null, "绑定邮箱>")
              ]),
              vue.createElementVNode("view", { onClick: upload }, [
                vue.createElementVNode("image", {
                  src: "/static/images/avatar.png",
                  mode: ""
                }),
                vue.createElementVNode("text", null, "修改头像>")
              ])
            ]),
            showMask.showName ? (vue.openBlock(), vue.createBlock(Mask, { key: 0 }, {
              default: vue.withCtx(() => [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "common_ipt",
                    type: "text",
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => user.username = $event),
                    placeholder: "请输入昵称"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, user.username]
                ]),
                vue.createElementVNode("view", { class: "oprate" }, [
                  vue.createElementVNode("view", {
                    class: "common confirm",
                    onClick: changeTickname
                  }, "确定"),
                  vue.createElementVNode("view", {
                    class: "common cancle",
                    onClick: cancle
                  }, "取消")
                ])
              ]),
              _: 1
              /* STABLE */
            })) : vue.createCommentVNode("v-if", true),
            showMask.showDesc ? (vue.openBlock(), vue.createBlock(Mask, { key: 1 }, {
              default: vue.withCtx(() => [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "common_ipt",
                    type: "text",
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => user.description = $event),
                    placeholder: "请输入个人简介"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, user.description]
                ]),
                vue.createElementVNode("view", { class: "oprate" }, [
                  vue.createElementVNode("view", {
                    class: "common confirm",
                    onClick: changeDesc
                  }, "确定"),
                  vue.createElementVNode("view", {
                    class: "common cancle",
                    onClick: cancle
                  }, "取消")
                ])
              ]),
              _: 1
              /* STABLE */
            })) : vue.createCommentVNode("v-if", true),
            showMask.showEmail ? (vue.openBlock(), vue.createBlock(Mask, { key: 2 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "email_top" }, [
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "email common_ipt",
                      type: "email",
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => user.email = $event),
                      placeholder: "请输入待绑定的邮箱号"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, user.email]
                  ]),
                  vue.createElementVNode("view", {
                    class: "common verificationCode",
                    onClick: getVerificationCode
                  }, [
                    vue.createElementVNode("text", null, "获取验证码")
                  ])
                ]),
                vue.createElementVNode("view", { class: "email_bottom" }, [
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "ipt_verificationCode common_ipt",
                      type: "text",
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => user.verificationCode = $event),
                      placeholder: "请输入验证码"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, user.verificationCode]
                  ]),
                  vue.createElementVNode("form", { action: "" }, [
                    vue.createElementVNode("view", { class: "oprate" }, [
                      vue.createElementVNode("view", {
                        class: "common confirm",
                        onClick: submit
                      }, [
                        vue.createElementVNode("text", null, "绑定")
                      ]),
                      vue.createElementVNode("view", {
                        class: "common cancle",
                        onClick: cancle
                      }, [
                        vue.createElementVNode("text", null, "取消")
                      ])
                    ])
                  ])
                ])
              ]),
              _: 1
              /* STABLE */
            })) : vue.createCommentVNode("v-if", true)
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesSetSet = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-8936fe0d"], ["__file", "D:/Front-end/uni-app/uni-project/app/pages/set/set.vue"]]);
  __definePage("pages/sportShop/sportShop", PagesSportShopSportShop);
  __definePage("pages/my/my", PagesMyMy);
  __definePage("pages/consumeHistory/consumeHistory", PagesConsumeHistoryConsumeHistory);
  __definePage("pages/datingCircles/datingCircles", PagesDatingCirclesDatingCircles);
  __definePage("pages/sportCart/sportCart", PagesSportCartSportCart);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/confirm/confirm", PagesConfirmConfirm);
  __definePage("pages/payment/payment", PagesPaymentPayment);
  __definePage("pages/paymentMethods/paymentMethods", PagesPaymentMethodsPaymentMethods);
  __definePage("pages/account/account", PagesAccountAccount);
  __definePage("pages/paySuccess/paySuccess", PagesPaySuccessPaySuccess);
  __definePage("pages/details/details", PagesDetailsDetails);
  __definePage("pages/registry/registry", PagesRegistryRegistry);
  __definePage("pages/findPwd/findPwd", PagesFindPwdFindPwd);
  __definePage("pages/search/search", PagesSearchSearch);
  __definePage("pages/set/set", PagesSetSet);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/Front-end/uni-app/uni-project/app/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    const baseUrl = "http://47.106.134.6:3003/api";
    app.config.globalProperties.baseUrl = baseUrl;
    app.use(createPinia());
    return {
      app,
      Pinia
      // 此处必须将 Pinia 返回
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
