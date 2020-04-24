/* global jQuery */

/* eslint-disable func-names */
(function ($) {
  const defaults = {
    maxItems: Infinity,
    minItems: 0,
    selectionText: "item",
    textPlural: "items",
    textNull: "Сколько гостей",
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
    setSelectionText(itemCount, totalItems) {
      const usePlural = totalItems !== 1 && this.textPlural.length > 0;
      const text = usePlural ? this.textPlural : this.selectionText;
      if (totalItems == 0) {
        return this.textNull;
      } else {
        return `${totalItems} ${text} ${itemCount['Взрослые']}`;
      }
    },
  };

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

      function updateDisplay() {
        console.log(itemCount);
        $selection.html(settings.setSelectionText(itemCount, totalItems));
      }

      function setItemSettings(id, $item) {
        const minCount = Number($item.data("mincount"));
        const maxCount = Number($item.data("maxcount"));

        settings.items[id] = {
          minCount: Number.isNaN(Number(minCount)) ? 0 : minCount,
          maxCount: Number.isNaN(Number(maxCount)) ? Infinity : maxCount,
        };
      }

      function addControls(id, $item) {
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

          if (
            allowClick &&
            totalItems > minItems &&
            itemCount[id] > items[id].minCount
          ) {
            itemCount[id] -= 1;

            if (itemCount[id] == 0) {
              $(
                `.iqdropdown-menu-option[data-id=\u0022${id}\u0022] .button-decrement`
              ).addClass("button-decrement_null");
            }

            totalItems -= 1;
            $counter.html(itemCount[id]);
            updateDisplay();
            onChange(id, itemCount[id], totalItems);
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
            totalItems += 1;
            $counter.html(itemCount[id]);
            $(
              `.iqdropdown-menu-option[data-id=\u0022${id}\u0022] .button-decrement`
            ).removeClass("button-decrement_null");
            updateDisplay();
            onChange(id, itemCount[id], totalItems);
          }

          event.preventDefault();
        });

        $item.click((event) => event.stopPropagation());

        $(".iqdropdown-footer-erase").click(() => {
          totalItems = 0;
          itemCount[id] = 0;
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
        console.log($item);
        const id = $item.data("id");
        const defaultCount = Number($item.data("defaultcount") || "0");

        itemCount[id] = defaultCount;
        totalItems += defaultCount;
        setItemSettings(id, $item);
        addControls(id, $item);
      });

      updateDisplay();
    });

    return this;
  };
})(jQuery);