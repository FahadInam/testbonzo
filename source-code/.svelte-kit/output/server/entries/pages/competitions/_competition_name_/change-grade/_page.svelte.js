import { s as store_get, i as copy_payload, j as assign_payload, u as unsubscribe_stores, p as pop, b as push, h as head } from "../../../../../chunks/index.js";
import { B as BackgroundImage } from "../../../../../chunks/BackgroundImage.js";
import { t } from "../../../../../chunks/language.store.js";
import { g as getTitle } from "../../../../../chunks/title.store.js";
import { g as get } from "../../../../../chunks/index3.js";
import "../../../../../chunks/client.js";
import { s as setCompetitionGrade, __tla as __tla_0 } from "../../../../../chunks/competitions.da.js";
import { S as ShupavuGradeSelector, G as GradeSelectBox, a as GradeConfirmModal } from "../../../../../chunks/GradeConfirmModal.js";
import { c as competitionStore } from "../../../../../chunks/appbar.store.js";
import { a as isShupavu } from "../../../../../chunks/system..da.js";
import "notyf";
import "../../../../../chunks/user.store.js";
import "lz-string";
import "../../../../../chunks/client2.js";
import "../../../../../chunks/index2.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
let _page;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  _page = function($$payload, $$props) {
    push();
    var $$store_subs;
    let cGrades = [
      {
        value: "",
        label: store_get($$store_subs ??= {}, "$t", t)("select_grade")
      }
    ];
    let showConfirm = false;
    let pendingGrade = "";
    async function handleSelect(grade) {
      const current = get(competitionStore).current_grade;
      if (!current) {
        await setCompetitionGrade(grade);
        return;
      }
      if (grade === current) {
        return;
      }
      pendingGrade = grade;
      showConfirm = true;
    }
    async function onConfirmChange() {
      showConfirm = false;
      await setCompetitionGrade(pendingGrade);
    }
    function onCancelChange() {
      showConfirm = false;
      pendingGrade = "";
    }
    let $$settled = true;
    let $$inner_payload;
    function $$render_inner($$payload2) {
      head($$payload2, ($$payload3) => {
        $$payload3.title = `<title>${escape_html(getTitle(store_get($$store_subs ??= {}, "$t", t)("select_grade")))}</title>`;
      });
      if (isShupavu) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<h1 class="md:text-4xl text-3xl font-bold text-white text-center w-full">${escape_html(store_get($$store_subs ??= {}, "$t", t)("select_grade_kenya_title"))}</h1>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<h1 class="md:text-4xl text-3xl font-bold text-white text-center w-full">${escape_html(store_get($$store_subs ??= {}, "$t", t)("select_grade"))}</h1>`;
      }
      $$payload2.out += `<!--]--> `;
      BackgroundImage($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<div class="flex items-center justify-center max-w-xl w-full bg-transparent rounded-lg p-8 mx-auto text-center space-y-10">`;
          if (isShupavu) {
            $$payload3.out += "<!--[-->";
            ShupavuGradeSelector($$payload3, {
              title: store_get($$store_subs ??= {}, "$t", t)("select_grade"),
              options: cGrades,
              onSelect: handleSelect
            });
          } else {
            $$payload3.out += "<!--[!-->";
            GradeSelectBox($$payload3, {
              title: store_get($$store_subs ??= {}, "$t", t)("select_grade"),
              options: cGrades,
              onSelect: handleSelect
            });
          }
          $$payload3.out += `<!--]--> `;
          GradeConfirmModal($$payload3, {
            title: store_get($$store_subs ??= {}, "$t", t)("change_grade"),
            message: store_get($$store_subs ??= {}, "$t", t)("change_grade_sure"),
            warningText: store_get($$store_subs ??= {}, "$t", t)("lost_earning"),
            onConfirm: onConfirmChange,
            onCancel: onCancelChange,
            get showModal() {
              return showConfirm;
            },
            set showModal($$value) {
              showConfirm = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----></div>`;
        },
        $$slots: {
          default: true
        }
      });
      $$payload2.out += `<!---->`;
    }
    do {
      $$settled = true;
      $$inner_payload = copy_payload($$payload);
      $$render_inner($$inner_payload);
    } while (!$$settled);
    assign_payload($$payload, $$inner_payload);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    pop();
  };
});
export {
  __tla,
  _page as default
};
