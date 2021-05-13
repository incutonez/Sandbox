<template>
  <Grid :columns="[{
    text: 'Id',
    field: 'Id'
  }, {
    text: 'Username',
    field: 'Username'
  }]"
        :store="usersStore" />
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld';

export default HelloWorld;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped
       lang="scss">
@import "HelloWorld";
</style>
