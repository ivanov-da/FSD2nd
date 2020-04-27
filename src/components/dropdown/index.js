/* global jQuery */

/* eslint-disable func-names */
(function ($) {
  const defaults = {
    maxItems: Infinity,
    minItems: 0,
    selectionText: "item",
    textPlural: "items",
    textNull: "Сколько гостей",
    maskArr: [
      ["guests", "Гость", "Гостя", "Гостей"],
      ["adults", "Взрослый", "Всзрослых", "Взрослых"],
      ["kids", "Ребенок", "Ребенка", "Детей"],
      ["babies", "Младенец", "Младенца", "Младенцев"],
    ],

    controls: {
      position: "right",
      displayCls: "iqdropdown-content",
      controlsCls: "iqdropdown-item-controls",
      counterCls: "counter",
    },
    items: {},
    onChange: () => {},
    beforeDecrement: () => true,
    beforeIncrement: () => true,
    setSelectionText(itemCount, totalItems, nonGroupCount, totalNonGroupItems) {
      const usePlural = totalItems !== 1 && this.textPlural.length > 0;
      const text = usePlural ? this.textPlural : this.selectionText;


      console.log('ttlnongr', totalNonGroupItems)
      for (let key in nonGroupCount) {
        totalNonGroupItems += nonGroupCount[key].count;
      }


      console.log('totalnongroup', totalNonGroupItems);

      let outIndexItems = valueToIndex(totalItems) + 1;

      let outText = `${totalItems}` + ' ' + `${this.maskArr[0][outIndexItems]}`;
      if (totalItems == 0) {
        outText = '';
      } else {
        if (totalNonGroupItems == 0) {
          outText = `${totalItems}` + ' ' + `${this.maskArr[0][outIndexItems]}`;
        } else {
          outText = `${totalItems}` + ' ' + `${this.maskArr[0][outIndexItems]}` + ', ';
        }
        //outText = `${totalItems}` + ' ' + `${this.maskArr[0][outIndexItems]}` + ', ';
      }




      for (let i = 0; i <= nonGroupCount.length - 1; i++) {
        for (let j = 0; j <= this.maskArr.length - 1; j++) {
          if (nonGroupCount[i].id == this.maskArr[j][0]) {
            let outIndex = valueToIndex(nonGroupCount[i].count) + 1;
            if (nonGroupCount[i].count == 0) {
              outText += '';
            } else {
              outText += `${nonGroupCount[i].count}` + ' ' + `${this.maskArr[j][outIndex]}` + ', ';
            }
          }
        }
      }

      let outTextMasked = outText;

      if (outText[outText.length - 2] == ',') {
        outTextMasked = outText.slice(0, -2);

      }

      if (outTextMasked.length > 20) {
        outTextMasked = outText.slice(0, 19) + '...';
      }



      if (totalItems == 0 && totalNonGroupItems == 0) {
        return this.textNull;
      } else {
        return outTextMasked;
      }
    },
  };

  function valueToIndex(value) {
    switch (value) {
      case 0:
        return 2;
      case 1:
        return 0;
      case 2:
      case 3:
      case 4:
        return 1;
      default:
        if (value > 20) {
          if (value > 99) {
            return valueToIndex(value % 100);
          }
          return valueToIndex(value % 10);
        }
        return 2;
    }
  }

  $.fn.iqDropdown = function (options) {
    this.each(function () {
      const $this = $(this);
      const $selection = $this.find("p.iqdropdown-selection").last();
      const $menu = $this.find("div.iqdropdown-menu");
      //добавляем еще и футер, чтобы дроп не закрывался по клику внутри меню на пустом месте где футер
      const $items = $menu.find(
        "div.iqdropdown-menu-option, .iqdropdown-footer"
      );
      const dataAttrOptions = {
        selectionText: $selection.data("selection-text"),
        textPlural: $selection.data("text-plural"),
      };
      const settings = $.extend(true, {}, defaults, dataAttrOptions, options);
      const itemCount = {};
      let totalItems = 0;
      let totalNonGroupItems = 0;
      let nonGroupCount = [];

      function updateDisplay() {
        console.log('ItemCount', itemCount);
        console.log('totalItems', totalItems);
        console.log('nonGroupCount', nonGroupCount);
        console.log('totalNonGroupItems', this.totalNonGroupItems);
        $selection.html(
          settings.setSelectionText(itemCount, totalItems, nonGroupCount, totalNonGroupItems)
        );
      }

      function setItemSettings(id, $item) {
        const minCount = Number($item.data("mincount"));
        const maxCount = Number($item.data("maxcount"));

        settings.items[id] = {
          minCount: Number.isNaN(Number(minCount)) ? 0 : minCount,
          maxCount: Number.isNaN(Number(maxCount)) ? Infinity : maxCount,
        };
      }

      function addControls(id, $item, group) {
        const $controls = $("<div />").addClass(settings.controls.controlsCls);
        const $decrementButton = $(`
          <button class="button-decrement button-decrement_null">
            <i class="icon-decrement"></i>
          </button>
        `);
        const $incrementButton = $(`
          <button class="button-increment">
            <i class="icon-decrement icon-increment"></i>
          </button>
        `);
        const $counter = $(`<span>${itemCount[id]}</span>`).addClass(
          settings.controls.counterCls
        );

        $item.children("div").addClass(settings.controls.displayCls);
        $controls.append($decrementButton, $counter, $incrementButton);

        //отрисовка кнопок только у меню, а не у футера
        if ($item.hasClass("iqdropdown-menu-option")) {
          if (settings.controls.position === "right") {
            $item.append($controls);
          } else {
            $item.prepend($controls);
          }
        }

        $decrementButton.click((event) => {
          const {
            items,
            minItems,
            beforeDecrement,
            onChange
          } = settings;
          const allowClick = beforeDecrement(id, itemCount);
          decrementClickGroupT =
            allowClick &&
            totalItems > minItems &&
            itemCount[id] > items[id].minCount;
          decrementClickGroupF =
            group == false && itemCount[id] > items[id].minCount;
          decrementClick = decrementClickGroupT || decrementClickGroupF;

          if (decrementClick) {
            itemCount[id] -= 1;

            if (itemCount[id] == 0) {
              $(
                `.iqdropdown-menu-option[data-id=\u0022${id}\u0022] .button-decrement`
              ).addClass("button-decrement_null");
            }
            if (group == true) {
              totalItems -= 1;
            } else if (group == false) {
              nonGroupCount.forEach(function (element, i, nonGroupCount) {
                if (element.id == id) {
                  element.count = itemCount[id];
                }
              });
            }
            $counter.html(itemCount[id]);
            updateDisplay();
            onChange(id, itemCount[id], totalItems, nonGroupCount);
          }

          event.preventDefault();
        });

        $incrementButton.click((event) => {
          const {
            items,
            maxItems,
            beforeIncrement,
            onChange
          } = settings;
          const allowClick = beforeIncrement(id, itemCount);

          if (
            allowClick &&
            totalItems < maxItems &&
            itemCount[id] < items[id].maxCount
          ) {
            itemCount[id] += 1;
            if (group == true) {
              totalItems += 1;
            } else if (group == false) {
              nonGroupCount.forEach(function (element, i, nonGroupCount) {
                if (element.id == id) {
                  element.count = itemCount[id];
                }
              });
            }
            $counter.html(itemCount[id]);
            $(
              `.iqdropdown-menu-option[data-id=\u0022${id}\u0022] .button-decrement`
            ).removeClass("button-decrement_null");
            updateDisplay();
            onChange(id, itemCount[id], totalItems, nonGroupCount);
          }



          event.preventDefault();
        });

        $item.click((event) => event.stopPropagation());

        $(".iqdropdown-footer-erase").click(() => {
          totalItems = 0;
          itemCount[id] = 0;

          nonGroupCount.forEach(function (element, i, nonGroupCount) {
            element.count = 0;
          });


          $counter.html(itemCount[id]);
          $(".button-decrement").addClass("button-decrement_null");
          updateDisplay();
        });

        return $item;
      }

      $this.click(() => {
        $this.toggleClass("menu-open");
      });






      $(".iqdropdown-footer-apply").click(() => {
        $this.toggleClass("menu-open");
      });

      $items.each(function () {
        const $item = $(this);
        const id = $item.data("id");
        const group = $item.data("group");
        const defaultCount = Number($item.data("defaultcount") || "0");

        itemCount[id] = defaultCount;

        if (group == false) {
          nonGroupCount.push({
            id,
            count: itemCount[id],
          });
        }

        totalItems += defaultCount;
        setItemSettings(id, $item);
        addControls(id, $item, group);
      });

      updateDisplay();
    });

    return this;
  };
})(jQuery);