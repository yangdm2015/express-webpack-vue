<template>
    <div style="height: 100%">
        <show-tree></show-tree>
    </div>
</template>
<script>
import showTree from './components/showTree'
export default {
    data() {
        return {
            title: 'hello vue2'
        }
    },
    components: { showTree }
}
</script>
