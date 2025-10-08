<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api, type Produto } from '../api'
import { useRoute, useRouter } from 'vue-router'
import { useNotifications } from '../stores/notifications'

const route = useRoute()
const router = useRouter()
const id = route.params.id ? Number(route.params.id) : undefined

const produto = ref<Produto>({ nome: '', preco: 0 })
const notifications = useNotifications()
const loading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  if (id) {
    loading.value = true
    try {
      produto.value = await api.getProduto(id)
    } catch (e: any) {
      error.value = e.message
    } finally { loading.value = false }
  }
})

async function submit() {
  loading.value = true
  error.value = null
  const precoNum = Number(produto.value.preco)
  // estoque removed: only validate preco
  if (Number.isNaN(precoNum)) {
    error.value = 'Preço deve ser um número válido'
    notifications.push(error.value, 'error')
    loading.value = false
    return
  }
  const payload: Produto = {
    ...produto.value,
    preco: precoNum,
  }

  try {
    if (id) {
      await api.updateProduto(id, payload)
      notifications.push('Produto atualizado e salvo com sucesso', 'success')
    } else {
      await api.createProduto(payload)
      notifications.push('Produto criado e salvo com sucesso', 'success')
    }
    router.push({ name: 'produtos' })
  } catch (e: any) {
    error.value = e.message
    notifications.push(e.message || 'Erro ao salvar', 'error')
  } finally { loading.value = false }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>{{ id ? 'Editar' : 'Novo' }} Produto</v-card-title>
          <v-card-text>
            <v-alert v-if="error" type="error">{{ error }}</v-alert>
            <v-form>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field outlined label="Nome" v-model="produto.nome" required />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field outlined label="Preço" v-model.number="produto.preco" type="number" required hint="Ex: 49.90" persistent-hint prefix="R$" />
                </v-col>
                <v-col cols="12">
                  <v-text-field outlined label="Descrição" v-model="produto.descricao" />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="$router.push({ name: 'produtos' })">Cancelar</v-btn>
            <v-btn color="primary" @click="submit" :loading="loading"><v-icon left>mdi-content-save</v-icon>Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
