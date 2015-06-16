// source: components/select.ts
/// <reference path="../typings/mithriljs/mithril.d.ts" />
// Author: Bram Gruneir (bram+code@cockroachlabs.com)
//

/**
 * Components defines reusable components which may be used on multiple pages,
 * or multiple times on the same page.
 */
module Components {
	/**
	 * Select is a basic html option select.
	 */
	export module Select {
		import property = _mithril.MithrilProperty;

		/**
		 * Item represents each option that can be selected. The value is the
		 * internal value representing the option and the text represents
		 * the text that is displayed in the option list.
		 */
		export interface Item {
			value: string;
			text: string;
		}

		/**
		 * Options contains all the info needed by the selector.  The items are
		 * a list of options that can be selected. Selected is a mithril
		 * property containing the currently selected option's value. Set this
		 * to the default value when creating the Select. onChange is any
		 * function that takes a string (the updated value) that will be called
		 * right after the selected option changes.
		 */
		export interface Options {
			items: Item[];
			selected: property<string>;
			onChange: (string) => void;
		}

		class Controller {
			constructor(public options: Options) {
			}

			onChange = (val: string) => {
				this.options.selected(val);
				this.options.onChange(val);
			}
		}

		export function controller(options: Options): Controller {
			return new Controller(options);
		}

		export function view(ctrl: Controller) {
			return m("select", { onchange: m.withAttr("value", ctrl.onChange) }, [
					ctrl.options.items.map(function(item) {
						return m('option', { value: item.value }, item.text);
				})
			])
		}
	}
}
