import Vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $bus: {
            $emit (name: string, options?: any): void
            $on (name: String, callback: function): void
        }
        $openDialog (options: hc.IAlertDialogOptions): Promise<void>
        $setActions (options?: hc.toolbar.IActions): void
        $setVisuals (options?: hc.toolbar.IVisuals): void
        $vuetify: any
    }
}
