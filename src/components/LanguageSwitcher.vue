<template>
  <div class="toggle" :class="{ right: currentLocale === 'en' }" @click="toggleLanguage">
    <div class="highlight"></div>
    <div class="option">Deutsch</div>
    <div class="option">English</div>
  </div>
</template>
  
<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useLanguageSettingsStore } from '@/stores/languageSettingsStore'

  const { locale } = useI18n()
  const languageSettingsStore = useLanguageSettingsStore()

  const currentLocale = computed(() => locale.value)

  function toggleLanguage() {
    const newLocale = locale.value === 'de' ? 'en' : 'de'
    locale.value = newLocale
    languageSettingsStore.setLanguage(newLocale)
  }
</script>