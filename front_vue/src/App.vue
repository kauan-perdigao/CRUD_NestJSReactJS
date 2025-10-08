<script setup lang="ts">
import { useNotifications } from './stores/notifications'
const notifications = useNotifications()
</script>

<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-toolbar-title>CRUD de Produtos Gerais</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <div>
      <v-snackbar v-for="item in notifications.items" :key="item.id" :model-value="true" :color="item.type === 'error' ? 'error' : 'success'" location="bottom">
        {{ item.message }}
      </v-snackbar>
    </div>
  </v-app>
</template>
