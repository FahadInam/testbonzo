import { s as store_get, c as attr, e as escape_html, u as unsubscribe_stores, d as bind_props, p as pop, b as push, f as stringify, o as sanitize_slots, a as slot, j as ensure_array_like, q as spread_attributes, r as css_props } from "./index.js";
import { o as onDestroy, t as tick, c as createEventDispatcher } from "./index-server.js";
import { B as Button } from "./Button.js";
import { f as fallback } from "./utils2.js";
import "./user.store.js";
import "lz-string";
import "./client.js";
import "./client2.js";
import { t } from "./language.store.js";
import { a as isShupavu } from "./system..da.js";
import { I as IMAGES } from "./images.constants.js";
import "./index2.js";
import { sha256 } from "js-sha256";
import { o as otpStore, __tla as __tla_0 } from "./user.auth.da.js";
import "notyf";
import { computePosition, autoUpdate, offset, flip, shift } from "@floating-ui/dom";
import "clsx";
import { d as derived } from "./index3.js";
import { p as page } from "./stores.js";
let Form;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function ResendOTP($$payload, $$props) {
    push();
    var $$store_subs;
    let isOtpVerified;
    let timer = 0;
    let isDisabled = true;
    let token = $$props["token"];
    let resetTurnstile = $$props["resetTurnstile"];
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${"0" + secs}`;
    }
    onDestroy(() => {
    });
    isOtpVerified = store_get($$store_subs ??= {}, "$otpStore", otpStore).is_otp_verified;
    if (!isOtpVerified) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button${attr("class", `resend-btn bg-transparent border-0 font-medium text-base text-gray-700 p-0 cursor-pointer svelte-43jspp ${stringify([
        "disabled"
      ].filter(Boolean).join(" "))}`)}${attr("disabled", isDisabled, true)} type="button">`;
      {
        $$payload.out += "<!--[-->";
        $$payload.out += `Resend in ${escape_html(formatTime(timer))}`;
      }
      $$payload.out += `<!--]--></button>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      token,
      resetTurnstile
    });
    pop();
  }
  function createFloatingActions(initOptions) {
    let referenceElement;
    let floatingElement;
    const defaultOptions = {
      autoUpdate: true
    };
    let options = initOptions;
    const getOptions = (mixin) => {
      return {
        ...defaultOptions,
        ...initOptions || {},
        ...mixin || {}
      };
    };
    const updatePosition = (updateOptions) => {
      if (referenceElement && floatingElement) {
        options = getOptions(updateOptions);
        computePosition(referenceElement, floatingElement, options).then((v) => {
          Object.assign(floatingElement.style, {
            position: v.strategy,
            left: `${v.x}px`,
            top: `${v.y}px`
          });
          options?.onComputed && options.onComputed(v);
        });
      }
    };
    const referenceAction = (node) => {
      if ("subscribe" in node) {
        setupVirtualElementObserver(node);
        return {};
      } else {
        referenceElement = node;
        updatePosition();
      }
    };
    const contentAction = (node, contentOptions) => {
      let autoUpdateDestroy;
      floatingElement = node;
      options = getOptions(contentOptions);
      setTimeout(() => updatePosition(contentOptions), 0);
      updatePosition(contentOptions);
      const destroyAutoUpdate = () => {
        if (autoUpdateDestroy) {
          autoUpdateDestroy();
          autoUpdateDestroy = void 0;
        }
      };
      const initAutoUpdate = ({ autoUpdate: autoUpdate$1 } = options || {}) => {
        destroyAutoUpdate();
        if (autoUpdate$1 !== false) {
          tick().then(() => {
            return autoUpdate(referenceElement, floatingElement, () => updatePosition(options), autoUpdate$1 === true ? {} : autoUpdate$1);
          });
        }
        return;
      };
      autoUpdateDestroy = initAutoUpdate();
      return {
        update(contentOptions2) {
          updatePosition(contentOptions2);
          autoUpdateDestroy = initAutoUpdate(contentOptions2);
        },
        destroy() {
          destroyAutoUpdate();
        }
      };
    };
    const setupVirtualElementObserver = (node) => {
      const unsubscribe = node.subscribe(($node) => {
        if (referenceElement === void 0) {
          referenceElement = $node;
          updatePosition();
        } else {
          Object.assign(referenceElement, $node);
          updatePosition();
        }
      });
      onDestroy(unsubscribe);
    };
    return [
      referenceAction,
      contentAction,
      updatePosition
    ];
  }
  function filter({ loadOptions, filterText, items, multiple, value, itemId, groupBy, filterSelectedItems, itemFilter, convertStringItemsToObjects, filterGroupedItems, label }) {
    if (items && loadOptions) return items;
    if (!items) return [];
    if (items && items.length > 0 && typeof items[0] !== "object") {
      items = convertStringItemsToObjects(items);
    }
    let filterResults = items.filter((item) => {
      let matchesFilter = itemFilter(item[label], filterText, item);
      if (matchesFilter && multiple && value?.length) {
        matchesFilter = !value.some((x) => {
          return filterSelectedItems ? x[itemId] === item[itemId] : false;
        });
      }
      return matchesFilter;
    });
    if (groupBy) {
      filterResults = filterGroupedItems(filterResults);
    }
    return filterResults;
  }
  async function getItems({ dispatch, loadOptions, convertStringItemsToObjects, filterText }) {
    let res = await loadOptions(filterText).catch((err) => {
      console.warn("svelte-select loadOptions error :>> ", err);
      dispatch("error", {
        type: "loadOptions",
        details: err
      });
    });
    if (res && !res.cancelled) {
      if (res) {
        if (res && res.length > 0 && typeof res[0] !== "object") {
          res = convertStringItemsToObjects(res);
        }
        dispatch("loaded", {
          items: res
        });
      } else {
        res = [];
      }
      return {
        filteredItems: res,
        loading: false,
        focused: true,
        listOpen: true
      };
    }
  }
  function ChevronIcon($$payload) {
    $$payload.out += `<svg width="100%" height="100%" viewBox="0 0 20 20" focusable="false" aria-hidden="true" class="svelte-qbd276"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747
          3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0
          1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502
          0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0
          0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>`;
  }
  function ClearIcon($$payload) {
    $$payload.out += `<svg width="100%" height="100%" viewBox="-2 -2 50 50" focusable="false" aria-hidden="true" role="presentation" class="svelte-whdbu1"><path fill="currentColor" d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124
    l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"></path></svg>`;
  }
  function LoadingIcon($$payload) {
    $$payload.out += `<svg class="loading svelte-1p3nqvd" viewBox="25 25 50 50"><circle class="circle_path svelte-1p3nqvd" cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-miterlimit="10"></circle></svg>`;
  }
  function Select($$payload, $$props) {
    const $$slots = sanitize_slots($$props);
    push();
    let filteredItems, hasValue, hideSelectedItem, showClear, placeholderText, ariaSelection, ariaContext;
    const dispatch = createEventDispatcher();
    let justValue = fallback($$props["justValue"], null);
    let filter$1 = fallback($$props["filter"], filter);
    let getItems$1 = fallback($$props["getItems"], getItems);
    let id = fallback($$props["id"], null);
    let name = fallback($$props["name"], null);
    let container = fallback($$props["container"], void 0);
    let input = fallback($$props["input"], void 0);
    let multiple = fallback($$props["multiple"], false);
    let multiFullItemClearable = fallback($$props["multiFullItemClearable"], false);
    let disabled = fallback($$props["disabled"], false);
    let focused = fallback($$props["focused"], false);
    let value = fallback($$props["value"], null);
    let filterText = fallback($$props["filterText"], "");
    let placeholder = fallback($$props["placeholder"], "Please select");
    let placeholderAlwaysShow = fallback($$props["placeholderAlwaysShow"], false);
    let items = fallback($$props["items"], null);
    let label = fallback($$props["label"], "label");
    let itemFilter = fallback($$props["itemFilter"], (label2, filterText2, option) => `${label2}`.toLowerCase().includes(filterText2.toLowerCase()));
    let groupBy = fallback($$props["groupBy"], void 0);
    let groupFilter = fallback($$props["groupFilter"], (groups) => groups);
    let groupHeaderSelectable = fallback($$props["groupHeaderSelectable"], false);
    let itemId = fallback($$props["itemId"], "value");
    let loadOptions = fallback($$props["loadOptions"], void 0);
    let containerStyles = fallback($$props["containerStyles"], "");
    let hasError = fallback($$props["hasError"], false);
    let filterSelectedItems = fallback($$props["filterSelectedItems"], true);
    let required = fallback($$props["required"], false);
    let closeListOnChange = fallback($$props["closeListOnChange"], true);
    let clearFilterTextOnBlur = fallback($$props["clearFilterTextOnBlur"], true);
    let createGroupHeaderItem = fallback($$props["createGroupHeaderItem"], (groupValue, item) => {
      return {
        value: groupValue,
        [label]: groupValue
      };
    });
    const getFilteredItems = () => {
      return filteredItems;
    };
    let searchable = fallback($$props["searchable"], true);
    let inputStyles = fallback($$props["inputStyles"], "");
    let clearable = fallback($$props["clearable"], true);
    let loading = fallback($$props["loading"], false);
    let listOpen = fallback($$props["listOpen"], false);
    let timeout;
    let debounce = fallback($$props["debounce"], (fn, wait = 1) => {
      clearTimeout(timeout);
      timeout = setTimeout(fn, wait);
    });
    let debounceWait = fallback($$props["debounceWait"], 300);
    let hideEmptyState = fallback($$props["hideEmptyState"], false);
    let inputAttributes = fallback($$props["inputAttributes"], () => ({}), true);
    let listAutoWidth = fallback($$props["listAutoWidth"], true);
    let showChevron = fallback($$props["showChevron"], false);
    let listOffset = fallback($$props["listOffset"], 5);
    let hoverItemIndex = fallback($$props["hoverItemIndex"], 0);
    let floatingConfig = fallback($$props["floatingConfig"], () => ({}), true);
    let containerClasses = fallback($$props["class"], "");
    let activeValue;
    let prev_value;
    let prev_filterText;
    function setValue() {
      if (typeof value === "string") {
        let item = (items || []).find((item2) => item2[itemId] === value);
        value = item || {
          [itemId]: value,
          label: value
        };
      } else if (multiple && Array.isArray(value) && value.length > 0) {
        value = value.map((item) => typeof item === "string" ? {
          value: item,
          label: item
        } : item);
      }
    }
    let _inputAttributes;
    function assignInputAttributes() {
      _inputAttributes = Object.assign({
        autocapitalize: "none",
        autocomplete: "off",
        autocorrect: "off",
        spellcheck: false,
        tabindex: 0,
        type: "text",
        "aria-autocomplete": "list"
      }, inputAttributes);
      if (id) {
        _inputAttributes["id"] = id;
      }
      if (!searchable) {
        _inputAttributes["readonly"] = true;
      }
    }
    function convertStringItemsToObjects(_items) {
      return _items.map((item, index) => {
        return {
          index,
          value: item,
          label: `${item}`
        };
      });
    }
    function filterGroupedItems(_items) {
      const groupValues = [];
      const groups = {};
      _items.forEach((item) => {
        const groupValue = groupBy(item);
        if (!groupValues.includes(groupValue)) {
          groupValues.push(groupValue);
          groups[groupValue] = [];
          if (groupValue) {
            groups[groupValue].push(Object.assign(createGroupHeaderItem(groupValue, item), {
              id: groupValue,
              groupHeader: true,
              selectable: groupHeaderSelectable
            }));
          }
        }
        groups[groupValue].push(Object.assign({
          groupItem: !!groupValue
        }, item));
      });
      const sortedGroupedItems = [];
      groupFilter(groupValues).forEach((groupValue) => {
        if (groups[groupValue]) sortedGroupedItems.push(...groups[groupValue]);
      });
      return sortedGroupedItems;
    }
    function dispatchSelectedItem() {
      if (multiple) {
        if (JSON.stringify(value) !== JSON.stringify(prev_value)) {
          if (checkValueForDuplicates()) ;
        }
        return;
      }
    }
    function setupMulti() {
      if (value) {
        if (Array.isArray(value)) {
          value = [
            ...value
          ];
        } else {
          value = [
            value
          ];
        }
      }
    }
    function setValueIndexAsHoverIndex() {
      const valueIndex = filteredItems.findIndex((i) => {
        return i[itemId] === value[itemId];
      });
      checkHoverSelectable(valueIndex, true);
    }
    function checkHoverSelectable(startingIndex = 0, ignoreGroup) {
      hoverItemIndex = startingIndex < 0 ? 0 : startingIndex;
      if (!ignoreGroup && groupBy && filteredItems[hoverItemIndex] && !filteredItems[hoverItemIndex].selectable) {
        setHoverIndex(1);
      }
    }
    function setupFilterText() {
      if (!loadOptions && filterText.length === 0) return;
      if (loadOptions) {
        debounce(async function() {
          loading = true;
          let res = await getItems$1({
            dispatch,
            loadOptions,
            convertStringItemsToObjects,
            filterText
          });
          if (res) {
            loading = res.loading;
            listOpen = listOpen ? res.listOpen : filterText.length > 0 ? true : false;
            focused = listOpen && res.focused;
            items = groupBy ? filterGroupedItems(res.filteredItems) : res.filteredItems;
          } else {
            loading = false;
            focused = true;
            listOpen = true;
          }
        }, debounceWait);
      } else {
        listOpen = true;
        if (multiple) {
          activeValue = void 0;
        }
      }
    }
    function computeJustValue() {
      if (multiple) return value ? value.map((item) => item[itemId]) : null;
      return value ? value[itemId] : value;
    }
    function checkValueForDuplicates() {
      let noDuplicates = true;
      if (value) {
        const ids = [];
        const uniqueValues = [];
        value.forEach((val) => {
          if (!ids.includes(val[itemId])) {
            ids.push(val[itemId]);
            uniqueValues.push(val);
          } else {
            noDuplicates = false;
          }
        });
        if (!noDuplicates) value = uniqueValues;
      }
      return noDuplicates;
    }
    function findItem(selection) {
      let matchTo = selection ? selection[itemId] : value[itemId];
      return items.find((item) => item[itemId] === matchTo);
    }
    function updateValueDisplay(items2) {
      if (!items2 || items2.length === 0 || items2.some((item) => typeof item !== "object")) return;
      if (!value || (multiple ? value.some((selection) => !selection || !selection[itemId]) : !value[itemId])) return;
      if (Array.isArray(value)) {
        value = value.map((selection) => findItem(selection) || selection);
      } else {
        value = findItem() || value;
      }
    }
    function handleFocus(e) {
      if (focused && input === document?.activeElement) return;
      input?.focus();
      focused = true;
    }
    function handleClear() {
      value = void 0;
      closeList();
      handleFocus();
    }
    function closeList() {
      if (clearFilterTextOnBlur) {
        filterText = "";
      }
      listOpen = false;
    }
    let ariaValues = fallback($$props["ariaValues"], (values) => {
      return `Option ${values}, selected.`;
    });
    let ariaListOpen = fallback($$props["ariaListOpen"], (label2, count) => {
      return `You are currently focused on option ${label2}. There are ${count} results available.`;
    });
    let ariaFocused = fallback($$props["ariaFocused"], () => {
      return `Select is focused, type to refine list, press down to open the menu.`;
    });
    function handleAriaSelection(_multiple) {
      let selected = void 0;
      if (_multiple && value.length > 0) {
        selected = value.map((v) => v[label]).join(", ");
      } else {
        selected = value[label];
      }
      return ariaValues(selected);
    }
    function handleAriaContent() {
      if (!filteredItems || filteredItems.length === 0) return "";
      let _item = filteredItems[hoverItemIndex];
      if (listOpen && _item) {
        let count = filteredItems ? filteredItems.length : 0;
        return ariaListOpen(_item[label], count);
      } else {
        return ariaFocused();
      }
    }
    onDestroy(() => {
    });
    function setHoverIndex(increment) {
      let selectableFilteredItems = filteredItems.filter((item) => !Object.hasOwn(item, "selectable") || item.selectable === true);
      if (selectableFilteredItems.length === 0) {
        return hoverItemIndex = 0;
      }
      if (hoverItemIndex === filteredItems.length - 1) {
        hoverItemIndex = 0;
      } else {
        hoverItemIndex = hoverItemIndex + increment;
      }
      const hover = filteredItems[hoverItemIndex];
      if (hover && hover.selectable === false) {
        setHoverIndex(increment);
        return;
      }
    }
    function isItemActive(item, value2, itemId2) {
      if (multiple) return;
      return value2 && value2[itemId2] === item[itemId2];
    }
    function isItemFirst(itemIndex) {
      return itemIndex === 0;
    }
    let _floatingConfig = {
      strategy: "absolute",
      placement: "bottom-start",
      middleware: [
        offset(listOffset),
        flip(),
        shift()
      ],
      autoUpdate: false
    };
    const [floatingRef, floatingContent, floatingUpdate] = createFloatingActions(_floatingConfig);
    let prefloat = true;
    function listMounted(list, listOpen2) {
      return prefloat = true;
    }
    if (value) setValue();
    if (inputAttributes || !searchable) assignInputAttributes();
    if (multiple) setupMulti();
    if (multiple && value && value.length > 1) checkValueForDuplicates();
    if (value) dispatchSelectedItem();
    if (!focused && input) closeList();
    if (filterText !== prev_filterText) setupFilterText();
    filteredItems = filter$1({
      loadOptions,
      filterText,
      items,
      multiple,
      value,
      itemId,
      groupBy,
      label,
      filterSelectedItems,
      itemFilter,
      convertStringItemsToObjects,
      filterGroupedItems
    });
    if (!multiple && listOpen && value && filteredItems) setValueIndexAsHoverIndex();
    if (listOpen && multiple) hoverItemIndex = 0;
    if (filterText) hoverItemIndex = 0;
    hasValue = multiple ? value && value.length > 0 : value;
    hideSelectedItem = hasValue && filterText.length > 0;
    showClear = hasValue && clearable && !disabled && !loading;
    placeholderText = placeholderAlwaysShow && multiple ? placeholder : multiple && value?.length === 0 ? placeholder : value ? "" : placeholder;
    ariaSelection = value ? handleAriaSelection(multiple) : "";
    ariaContext = handleAriaContent();
    updateValueDisplay(items);
    justValue = computeJustValue();
    if (listOpen && filteredItems && !multiple && !value) checkHoverSelectable();
    if (container && floatingConfig) floatingUpdate(Object.assign(_floatingConfig, floatingConfig));
    listMounted();
    if (input && listOpen && !focused) handleFocus();
    if (container && floatingConfig?.autoUpdate === void 0) {
      _floatingConfig.autoUpdate = true;
    }
    $$payload.out += `<div${attr("class", `svelte-select ${stringify(containerClasses)} svelte-82qwg8 ${stringify([
      multiple ? "multi" : "",
      disabled ? "disabled" : "",
      focused ? "focused" : "",
      listOpen ? "list-open" : "",
      showChevron ? "show-chevron" : "",
      hasError ? "error" : ""
    ].filter(Boolean).join(" "))}`)}${attr("style", containerStyles)} role="none">`;
    if (listOpen) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${attr("class", `svelte-select-list svelte-82qwg8 ${stringify([
        prefloat ? "prefloat" : ""
      ].filter(Boolean).join(" "))}`)} role="none">`;
      if ($$slots["list-prepend"]) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<!---->`;
        slot($$payload, $$props, "list-prepend", {}, null);
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if ($$slots.list) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<!---->`;
        slot($$payload, $$props, "list", {
          filteredItems
        }, null);
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        if (filteredItems.length > 0) {
          $$payload.out += "<!--[-->";
          const each_array = ensure_array_like(filteredItems);
          $$payload.out += `<!--[-->`;
          for (let i = 0, $$length = each_array.length; i < $$length; i++) {
            let item = each_array[i];
            $$payload.out += `<div class="list-item svelte-82qwg8" tabindex="-1" role="none"><div${attr("class", `item svelte-82qwg8 ${stringify([
              item.groupHeader ? "list-group-title" : "",
              isItemActive(item, value, itemId) ? "active" : "",
              isItemFirst(i) ? "first" : "",
              hoverItemIndex === i ? "hover" : "",
              item.groupItem ? "group-item" : "",
              item?.selectable === false ? "not-selectable" : ""
            ].filter(Boolean).join(" "))}`)}><!---->`;
            slot($$payload, $$props, "item", {
              item,
              index: i
            }, () => {
              $$payload.out += `${escape_html(item?.[label])}`;
            });
            $$payload.out += `<!----></div></div>`;
          }
          $$payload.out += `<!--]-->`;
        } else {
          $$payload.out += "<!--[!-->";
          if (!hideEmptyState) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<!---->`;
            slot($$payload, $$props, "empty", {}, () => {
              $$payload.out += `<div class="empty svelte-82qwg8">No options</div>`;
            });
            $$payload.out += `<!---->`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]-->`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--> `;
      if ($$slots["list-append"]) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<!---->`;
        slot($$payload, $$props, "list-append", {}, null);
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <span aria-live="polite" aria-atomic="false" aria-relevant="additions text" class="a11y-text svelte-82qwg8">`;
    if (focused) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span id="aria-selection" class="svelte-82qwg8">${escape_html(ariaSelection)}</span> <span id="aria-context" class="svelte-82qwg8">${escape_html(ariaContext)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></span> <div class="prepend svelte-82qwg8"><!---->`;
    slot($$payload, $$props, "prepend", {}, null);
    $$payload.out += `<!----></div> <div class="value-container svelte-82qwg8">`;
    if (hasValue) {
      $$payload.out += "<!--[-->";
      if (multiple) {
        $$payload.out += "<!--[-->";
        const each_array_1 = ensure_array_like(value);
        $$payload.out += `<!--[-->`;
        for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
          let item = each_array_1[i];
          $$payload.out += `<div${attr("class", `multi-item svelte-82qwg8 ${stringify([
            activeValue === i ? "active" : "",
            disabled ? "disabled" : ""
          ].filter(Boolean).join(" "))}`)} role="none"><span class="multi-item-text svelte-82qwg8"><!---->`;
          slot($$payload, $$props, "selection", {
            selection: item,
            index: i
          }, () => {
            $$payload.out += `${escape_html(item[label])}`;
          });
          $$payload.out += `<!----></span> `;
          if (!disabled && !multiFullItemClearable && ClearIcon) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<div class="multi-item-clear svelte-82qwg8"><!---->`;
            slot($$payload, $$props, "multi-clear-icon", {}, () => {
              ClearIcon($$payload);
            });
            $$payload.out += `<!----></div>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div>`;
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<div${attr("class", `selected-item svelte-82qwg8 ${stringify([
          hideSelectedItem ? "hide-selected-item" : ""
        ].filter(Boolean).join(" "))}`)}><!---->`;
        slot($$payload, $$props, "selection", {
          selection: value
        }, () => {
          $$payload.out += `${escape_html(value[label])}`;
        });
        $$payload.out += `<!----></div>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <input${spread_attributes({
      readonly: !searchable,
      ..._inputAttributes,
      value: filterText,
      placeholder: placeholderText,
      style: inputStyles,
      disabled
    }, {
      "svelte-82qwg8": true
    })}></div> <div class="indicators svelte-82qwg8">`;
    if (loading) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="icon loading svelte-82qwg8" aria-hidden="true"><!---->`;
      slot($$payload, $$props, "loading-icon", {}, () => {
        LoadingIcon($$payload);
      });
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (showClear) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button type="button" class="icon clear-select svelte-82qwg8"><!---->`;
      slot($$payload, $$props, "clear-icon", {}, () => {
        ClearIcon($$payload);
      });
      $$payload.out += `<!----></button>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (showChevron) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="icon chevron svelte-82qwg8" aria-hidden="true"><!---->`;
      slot($$payload, $$props, "chevron-icon", {
        listOpen
      }, () => {
        ChevronIcon($$payload);
      });
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <!---->`;
    slot($$payload, $$props, "input-hidden", {
      value
    }, () => {
      $$payload.out += `<input${attr("name", name)} type="hidden"${attr("value", value ? JSON.stringify(value) : null)} class="svelte-82qwg8">`;
    });
    $$payload.out += `<!----> `;
    if (required && (!value || value.length === 0)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      slot($$payload, $$props, "required", {
        value
      }, () => {
        $$payload.out += `<select class="required svelte-82qwg8" required tabindex="-1" aria-hidden="true"></select>`;
      });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
    bind_props($$props, {
      justValue,
      filter: filter$1,
      getItems: getItems$1,
      id,
      name,
      container,
      input,
      multiple,
      multiFullItemClearable,
      disabled,
      focused,
      value,
      filterText,
      placeholder,
      placeholderAlwaysShow,
      items,
      label,
      itemFilter,
      groupBy,
      groupFilter,
      groupHeaderSelectable,
      itemId,
      loadOptions,
      containerStyles,
      hasError,
      filterSelectedItems,
      required,
      closeListOnChange,
      clearFilterTextOnBlur,
      createGroupHeaderItem,
      searchable,
      inputStyles,
      clearable,
      loading,
      listOpen,
      debounce,
      debounceWait,
      hideEmptyState,
      inputAttributes,
      listAutoWidth,
      showChevron,
      listOffset,
      hoverItemIndex,
      floatingConfig,
      class: containerClasses,
      ariaValues,
      ariaListOpen,
      ariaFocused,
      getFilteredItems,
      handleClear
    });
    pop();
  }
  function PasswordStrengthPopover($$payload, $$props) {
    push();
    var $$store_subs;
    let metCount, strength, barColors;
    let password = fallback($$props["password"], "");
    let visible = fallback($$props["visible"], false);
    let inputEl = fallback($$props["inputEl"], null);
    const requirements = [
      {
        label: "Include 8 characters",
        test: (pw) => pw.length >= 8
      },
      {
        label: "Add 1 uppercase letter",
        test: (pw) => /[A-Z]/.test(pw)
      },
      {
        label: "Add 1 lowercase letter",
        test: (pw) => /[a-z]/.test(pw)
      },
      {
        label: "Include at least 1 digit",
        test: (pw) => /\d/.test(pw)
      },
      {
        label: "Include at least 1 special character",
        test: (pw) => /[^A-Za-z0-9]/.test(pw)
      }
    ];
    derived(page, ($page) => $page.url.pathname === "/account/forgot-password");
    function updatePosition() {
      return;
    }
    onDestroy(() => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    });
    metCount = requirements.filter((r) => r.test(password)).length;
    strength = metCount < 2 ? {
      label: store_get($$store_subs ??= {}, "$t", t)("weak_password"),
      color: "text-black",
      bar: "bg-gray-300"
    } : metCount === 2 ? {
      label: store_get($$store_subs ??= {}, "$t", t)("average_password"),
      color: "text-black",
      bar: "bg-yellow-400"
    } : metCount === 3 || metCount === 4 ? {
      label: store_get($$store_subs ??= {}, "$t", t)("good_password"),
      color: "text-black",
      bar: "bg-green-400"
    } : {
      label: store_get($$store_subs ??= {}, "$t", t)("strong_password"),
      color: "text-black",
      bar: "bg-green-600"
    };
    if (visible) setTimeout(updatePosition, 0);
    barColors = (() => {
      if (metCount < 2) return [
        "#ef4444",
        "#d1d5db",
        "#d1d5db",
        "#d1d5db"
      ];
      if (metCount === 2) return [
        "#fbbf24",
        "#fbbf24",
        "#d1d5db",
        "#d1d5db"
      ];
      if (metCount === 3 || metCount === 4) return [
        "#34d399",
        "#34d399",
        "#34d399",
        "#d1d5db"
      ];
      if (metCount === 5) return [
        "#10b981",
        "#10b981",
        "#10b981",
        "#10b981"
      ];
      return [
        "#d1d5db",
        "#d1d5db",
        "#d1d5db",
        "#d1d5db"
      ];
    })();
    if (visible) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(barColors);
      const each_array_1 = ensure_array_like(requirements);
      $$payload.out += `<div class="absolute left-0 z-50 min-w-[270px] max-w-xs bg-white border rounded-xl p-0 font-poppins animate-fade-in shadow-[0_4px_10px_rgba(0,0,0,0.1),0_0px_10px_rgba(0,0,0,0.1)] svelte-cowc2c"${attr("style", ` ${stringify("top: calc(100% + 12px);")} border-color: ${stringify(metCount === 5 ? "#d1d5db" : "#d1d5db")}; `)}><div class="absolute left-6 w-4 h-4 overflow-hidden"${attr("style", "top: -16px;")}><div${attr("class", `${stringify(`w-4 h-4 mx-auto rotate-45 shadow-md bg-white ${"mt-2.5"}`)} svelte-cowc2c`)}></div></div> <div class="px-4 pt-3 pb-2"><div class="flex items-center gap-2 mb-2"><span${attr("class", `font-semibold text-base ${stringify(strength.color)} svelte-cowc2c`)}>${escape_html(strength.label)}</span></div> <div class="flex gap-1 mb-3 mt-1"><!--[-->`;
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let color = each_array[i];
        $$payload.out += `<div class="h-1 rounded w-1/4 transition-all duration-200"${attr("style", `background-color: ${stringify(color)}`)}></div>`;
      }
      $$payload.out += `<!--]--></div> <div class="text-sm text-gray-600 mb-1">To make your password stronger:</div> <ul class="space-y-1 mb-1"><!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let req = each_array_1[$$index_1];
        $$payload.out += `<li class="flex items-center gap-1 text-sm">`;
        if (req.test(password)) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<svg class="text-[var(--primary-color)] w-4 h-4 -ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> <span class="text-[var(--primary-color)] font-medium">${escape_html(req.label)}</span>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<span class="text-gray-400 mr-1.5 text-lg leading-none">\u2022</span> <span class="text-gray-600">${escape_html(req.label)}</span>`;
        }
        $$payload.out += `<!--]--></li>`;
      }
      $$payload.out += `<!--]--></ul></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      password,
      visible,
      inputEl
    });
    pop();
  }
  Form = function($$payload, $$props) {
    push();
    var $$store_subs;
    let fields = fallback($$props["fields"], () => [], true);
    let buttons = fallback($$props["buttons"], () => [], true);
    let turnstileSiteKey = fallback($$props["turnstileSiteKey"], "");
    let enableTurnstile = fallback($$props["enableTurnstile"], false);
    let forgotPassword = fallback($$props["forgotPassword"], () => ({}), true);
    let formData = fallback($$props["formData"], () => ({}), true);
    let handleSubmit = fallback($$props["handleSubmit"], (formData2) => {
    });
    let handleError = fallback($$props["handleError"], (errors2) => {
    });
    let handleCancel = fallback($$props["handleCancel"], () => {
    });
    let handleOtherAction = fallback($$props["handleOtherAction"], (formData2) => {
    });
    let errors = {};
    let turnstileToken = "";
    let submitted = false;
    let showPasswords = {};
    let passwordPopoverVisible = false;
    let passwordInputRefs = {};
    onDestroy(() => {
    });
    const resetTurnstile = () => {
      return new Promise((accept, reject) => {
        if (enableTurnstile) {
          turnstileToken = null;
          enableTurnstile = false;
          setTimeout(() => {
            enableTurnstile = true;
            accept(true);
          }, 100);
        } else {
          accept(true);
        }
      });
    };
    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
    const validatePhone = (phone) => {
      const shupavuRegex = /^\+254\d{9}$/;
      const normalRegex = /^(?:\+92|0)3\d{9}$/;
      const regex = isShupavu ? shupavuRegex : normalRegex;
      return regex.test(phone);
    };
    const validatePassword = (password) => {
      return password.length >= 8;
    };
    const validateField = (field) => {
      const { name, value, type, required } = field;
      if (required && !value) {
        errors[name] = store_get($$store_subs ??= {}, "$t", t)("field_required");
        return false;
      }
      switch (type) {
        case "email":
          if (!validateEmail(value)) {
            errors[name] = store_get($$store_subs ??= {}, "$t", t)("invalid_email");
            return false;
          }
          break;
        case "tel":
          if (!validatePhone(value)) {
            errors[name] = store_get($$store_subs ??= {}, "$t", t)("invalid_phone");
            return false;
          }
          break;
        case "password":
          if (!validatePassword(value)) {
            errors[name] = store_get($$store_subs ??= {}, "$t", t)("invalid_password");
            return false;
          }
          break;
      }
      delete errors[name];
      return true;
    };
    const validateForm = () => {
      let isValid = true;
      fields.forEach((field) => {
        if (!validateField({
          ...field,
          value: formData[field.name]
        })) {
          isValid = false;
        }
      });
      if (enableTurnstile && !turnstileToken) {
        errors.turnstile = store_get($$store_subs ??= {}, "$t", t)("complete_captcha");
        isValid = false;
      }
      return isValid;
    };
    const handleButtonClick = async (button) => {
      if (button.type === "submit") {
        if (!turnstileToken && enableTurnstile) {
          await resetTurnstile();
        }
        submitted = true;
        if (validateForm()) {
          const passwordField = fields.find((field) => field.type === "password");
          const confirmPasswordField = fields.find((field) => field.name === "confirmPassword");
          if (passwordField && confirmPasswordField && formData[passwordField.name] !== formData[confirmPasswordField.name]) {
            errors.confirmPassword = store_get($$store_subs ??= {}, "$t", t)("password_not_match");
            handleError(errors);
            return;
          }
          const hashedFormData = {
            ...formData
          };
          if (passwordField) {
            hashedFormData[passwordField.name] = sha256(formData[passwordField.name]).toString();
          }
          handleSubmit({
            ...hashedFormData,
            turnstileToken
          });
          resetTurnstile();
        } else {
          handleError(errors);
        }
      } else if (button.action === "cancel") {
        handleCancel();
      } else {
        handleOtherAction(formData);
      }
    };
    Object.keys(passwordInputRefs).forEach((name) => {
      if (!fields.find((f) => f.name === name && f.showPasswordStrength)) {
        delete passwordInputRefs[name];
      }
    });
    const each_array = ensure_array_like(fields);
    const each_array_1 = ensure_array_like(buttons);
    $$payload.out += `<form class="space-y-4"><!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let field = each_array[index];
      if (field.layout === "half") {
        $$payload.out += "<!--[-->";
        if (index === 0 || fields[index - 1].layout !== "half" || index % 2 === 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"><div class="w-full md:flex-1"><label${attr("for", field.name)} class="block text-base font-semibold text-gray-700">${escape_html(field.label)}</label> `;
          if (field.type === "select") {
            $$payload.out += "<!--[-->";
            css_props($$payload, true, {
              "--chevron-icon-size": "20px",
              "--chevron-icon-colour": "#6B7280"
            }, () => {
              Select($$payload, {
                items: field.options,
                id: field.name,
                name: field.name,
                value: formData[field.name],
                class: "!mt-1 dropdown focus:ring block w-full !pl-3 !p-1 border-[1px] border-[#DEDEDE] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white",
                required: field.required,
                itemId: "value",
                label: "label",
                clearable: false,
                searchable: false,
                showChevron: true
              });
            });
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `<input${attr("type", field.type)}${attr("id", field.name)}${attr("name", field.name)}${attr("value", formData[field.name])} class="mt-1 block w-full p-3 border-[1px] border-[#DEDEDE] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-poppins placeholder:text-[#AEAEAE] bg-white read-only:bg-gray-100/50"${attr("placeholder", field.placeholder)}${attr("required", field.required, true)}${attr("readonly", field.readonly, true)}${attr("disabled", field.readonly, true)}>`;
          }
          $$payload.out += `<!--]--> `;
          if (submitted && errors[field.name]) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<p class="error svelte-1ew89s8">${escape_html(errors[field.name])}</p>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div> `;
          if (index + 1 < fields.length && fields[index + 1].layout === "half") {
            $$payload.out += "<!--[-->";
            $$payload.out += `<div class="w-full md:flex-1"><label${attr("for", fields[index + 1].name)} class="block text-base font-semibold text-gray-700">${escape_html(fields[index + 1].label)}</label> `;
            if (fields[index + 1].type === "select") {
              $$payload.out += "<!--[-->";
              css_props($$payload, true, {
                "--chevron-icon-size": "20px",
                "--chevron-icon-colour": "#6B7280"
              }, () => {
                Select($$payload, {
                  items: fields[index + 1].options,
                  id: fields[index + 1].name,
                  clearable: false,
                  name: fields[index + 1].name,
                  value: fields[index + 1].options.find((opt) => opt.value === formData[fields[index + 1].name]),
                  class: "!mt-1 dropdown focus:ring block !w-full !p-1 !pl-3 border-[1px] border-[#DEDEDE] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white",
                  required: fields[index + 1].required,
                  itemId: "value",
                  label: "label",
                  searchable: false,
                  placement: "auto",
                  showChevron: true
                });
              });
              $$payload.out += ` `;
              if (submitted && errors[fields[index + 1].name]) {
                $$payload.out += "<!--[-->";
                $$payload.out += `<p class="error text-start svelte-1ew89s8">${escape_html(errors[fields[index + 1].name])}</p>`;
              } else {
                $$payload.out += "<!--[!-->";
              }
              $$payload.out += `<!--]-->`;
            } else {
              $$payload.out += "<!--[!-->";
              $$payload.out += `<input${attr("type", fields[index + 1].type)}${attr("id", fields[index + 1].name)}${attr("name", fields[index + 1].name)}${attr("value", formData[fields[index + 1].name])} class="mt-1 block w-full p-3 border-[1px] border-[#DEDEDE] rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] font-poppins placeholder:text-[#AEAEAE] bg-white read-only:bg-gray-100/50"${attr("placeholder", fields[index + 1].placeholder)}${attr("required", fields[index + 1].required, true)}${attr("readonly", fields[index + 1].readonly, true)}${attr("disabled", fields[index + 1].readonly, true)}>`;
            }
            $$payload.out += `<!--]--> `;
            if (submitted && errors[fields[index + 1].name]) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<p class="error svelte-1ew89s8">${escape_html(errors[fields[index + 1].name])}</p>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]--></div>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<div><label${attr("for", field.name)} class="block text-base font-semibold text-gray-700">${escape_html(field.label)}</label> <div class="relative">`;
        if (field.type === "select") {
          $$payload.out += "<!--[-->";
          css_props($$payload, true, {
            "--chevron-icon-size": "20px",
            "--chevron-icon-colour": "#6B7280"
          }, () => {
            Select($$payload, {
              items: field.options,
              id: field.name,
              name: field.name,
              value: formData[field.name],
              class: "mt-1 block dropdown focus:ring w-full p-3 border-[1px] border-[#DEDEDE] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white",
              required: field.required,
              itemId: "value",
              label: "label",
              clearable: false,
              searchable: false,
              showChevron: true
            });
          });
          $$payload.out += ` `;
          if (submitted && errors[field.name]) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<p class="error text-start svelte-1ew89s8">${escape_html(errors[field.name])}</p>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]-->`;
        } else {
          $$payload.out += "<!--[!-->";
          if (field.type === "tel") {
            $$payload.out += "<!--[-->";
            $$payload.out += `<div class="relative"><span class="absolute tracking-wider left-3 top-1/2 transform -translate-y-1/2 text-[#B9B9B9] font-semibold pointer-events-none z-10">${escape_html(field.prefix)}</span> <input type="tel"${attr("id", field.name)}${attr("name", field.name)}${attr("value", formData[field.name] ? formData[field.name].replace(field.prefix, "").trim() : "")} class="block w-full p-3 pl-[calc(0.7rem*4+theme(spacing.3))] border-[1px] border-[#DEDEDE] rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] font-poppins placeholder:text-[#AEAEAE] bg-white"${attr("placeholder", field.placeholder)}${attr("required", field.required, true)}></div> `;
            if (submitted && errors[field.name]) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<p class="error text-start svelte-1ew89s8">${escape_html(errors[field.name])}</p>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]-->`;
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `<input${attr("type", field.type === "password" ? showPasswords[field.name] ? "text" : "password" : field.type)}${attr("id", field.name)}${attr("name", field.name)}${attr("value", formData[field.name])} class="mt-1 block w-full p-3 border-[1px] border-[#DEDEDE] rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] pr-10 font-poppins placeholder:text-[#AEAEAE] bg-white read-only:bg-gray-100/50"${attr("placeholder", field.placeholder)}${attr("required", field.required, true)}${attr("readonly", field.readonly, true)}${attr("disabled", field.readonly, true)}> <div class="w-full"><div>`;
            if (submitted && errors[field.name]) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<p class="error text-start svelte-1ew89s8">${escape_html(errors[field.name])}</p>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]--></div> `;
            if (forgotPassword && field.type === "password") {
              $$payload.out += "<!--[-->";
              $$payload.out += `<div class="mt-2 flex justify-end"><a${attr("href", forgotPassword.link)} class="text-gray-900 font-medium text-sm hover:underline hover:text-gray-600">${escape_html(forgotPassword.label)}</a></div>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]--></div> `;
            if (field.name == "otp") {
              $$payload.out += "<!--[-->";
              $$payload.out += `<div class="mt-2 text-end">`;
              ResendOTP($$payload, {
                token: turnstileToken,
                resetTurnstile
              });
              $$payload.out += `<!----></div>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]--> `;
            if (field.showPasswordStrength) {
              $$payload.out += "<!--[-->";
              PasswordStrengthPopover($$payload, {
                password: formData[field.name] || "",
                visible: passwordPopoverVisible,
                inputEl: passwordInputRefs[field.name]
              });
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]-->`;
          }
          $$payload.out += `<!--]-->`;
        }
        $$payload.out += `<!--]--> `;
        if (field.type === "password") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<button type="button" class="absolute right-0 pr-3 flex items-center text-sm leading-5 top-[12.7px]">`;
          if (showPasswords[field.name]) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<svg class="w-6 h-6 text-[var(--primary-color)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"></path></svg>`;
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `<svg class="w-6 h-6 text-[var(--primary-color)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="m4 15.6 3.055-3.056A4.913 4.913 0 0 1 7 12.012a5.006 5.006 0 0 1 5-5c.178.009.356.027.532.054l1.744-1.744A8.973 8.973 0 0 0 12 5.012c-5.388 0-10 5.336-10 7A6.49 6.49 0 0 0 4 15.6Z"></path><path d="m14.7 10.726 4.995-5.007A.998.998 0 0 0 18.99 4a1 1 0 0 0-.71.305l-4.995 5.007a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.402.211.59l-4.995 4.983a1 1 0 1 0 1.414 1.414l4.995-4.983c.189.091.386.162.59.211.011 0 .021.007.033.01a2.982 2.982 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z"></path><path d="m19.821 8.605-2.857 2.857a4.952 4.952 0 0 1-5.514 5.514l-1.785 1.785c.767.166 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z"></path></svg>`;
          }
          $$payload.out += `<!--]--></button>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (field.name === "otp" && field.readonly) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="absolute right-0 pr-3 flex items-center text-sm leading-5 top-[10px]"><img${attr("src", IMAGES.CHECK_ICON)} alt="check icon"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div></div>`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--> `;
    if (enableTurnstile) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="turnstile-container w-full svelte-1ew89s8"><div${attr("turnstile-sitekey", turnstileSiteKey)} turnstile-theme="light" turnstile-size="flexible" turnstile-language="en" turnstile-response-field-name="turnstile" turnstile-response-field=""></div> `;
      if (submitted && errors.turnstile) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<p class="error svelte-1ew89s8">${escape_html(errors.turnstile)}</p>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="button-container pt-2 svelte-1ew89s8"><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let button = each_array_1[$$index_1];
      Button($$payload, {
        label: button.label,
        type: button.layout,
        customClass: button.customClass,
        onClick: () => handleButtonClick(button)
      });
    }
    $$payload.out += `<!--]--></div></form>`;
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, {
      fields,
      buttons,
      turnstileSiteKey,
      enableTurnstile,
      forgotPassword,
      formData,
      handleSubmit,
      handleError,
      handleCancel,
      handleOtherAction
    });
    pop();
  };
});
export {
  Form as F,
  __tla
};
