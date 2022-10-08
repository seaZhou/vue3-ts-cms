<template>
  <div class="menu">
    <page-content :contentConfig="contentTableConfig" pageName="menu" />
  </div>
</template>

<script lang="ts">
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

import { defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  components: { PageContent },
  setup() {
    const store = useStore()
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
