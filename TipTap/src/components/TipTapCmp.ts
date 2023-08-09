import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import TipTapComponent from "./TipTapComponent.vue";

export default Node.create({
    name: 'TipTapComponent',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            token: {
                default: {},
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'TipTapComponent',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['TipTapComponent', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return VueNodeViewRenderer(TipTapComponent)
    },
})
