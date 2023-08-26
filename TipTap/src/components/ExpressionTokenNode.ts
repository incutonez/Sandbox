import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import ExpressionToken from "@/components/ExpressionToken.vue";

export default Node.create({
  name: "ExpressionToken",
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
      tag: "ExpressionToken",
    }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["ExpressionToken", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return VueNodeViewRenderer(ExpressionToken);
  },
});
