<template>
  <div>
    <q-table
     title="Debug Log"
     :data="debugLog"
     :columns="tableFields"
     hide-header
     :pagination={rowsPerPage:0}
     >
        <template v-slot:body-cell-log="data">
            <q-td :props="data" style="white-space: normal">
                <div>
                    {{data.row}}
                </div>
            </q-td>
        </template>
    </q-table>
  </div>
</template>

<script>
export default {
    name: 'DebugView',
    computed: {
        debugLog: {
            get() { return this.$store.getters.getDebugLog}
        }
    },
    mounted(){
        console.log(this.$store.getters.getDebugLog)
    },
    data() {
        return {
            tableFields: [
                {name: "log", label: "Log Message", align:"left", headerStyle: 'max-width: 100px'}

                // {
                //     key: 'log',
                //     label: 'Log Message',
                // }
            ]
        }
    }
}
</script>

<style>

</style>