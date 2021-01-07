<template>
  <div>
    <b-table :items="debugLog" :fields="tableFields">
        <template #cell(log)="data">
               {{data}}
            </template>
    </b-table>
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
                {
                    key: 'log',
                    label: 'Log Message',
                }
            ]
        }
    }
}
</script>

<style>

</style>