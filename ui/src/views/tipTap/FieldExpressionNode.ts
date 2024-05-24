import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import FieldExpression from "@/views/tipTap/FieldExpression.vue";

export default Node.create({
	name: "FieldExpression",
	group: "block",
	atom: true,

	addAttributes() {
		return {
			token: {
				default: {},
			},
		};
	},

	parseHTML() {
		return [{
			tag: "FieldExpression",
		}];
	},

	renderHTML({ HTMLAttributes }) {
		return ["FieldExpression", mergeAttributes(HTMLAttributes)];
	},

	addNodeView() {
		return VueNodeViewRenderer(FieldExpression);
	},
});
