<script setup lang="ts">

import { ref, onMounted, computed } from 'vue'
import { api, type Produto } from '../api'
import { useRouter } from 'vue-router'
import { useNotifications } from '../stores/notifications'

const produtos = ref<Produto[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const router = useRouter()
const notifications = useNotifications()

const search = ref('')
const page = ref(1)
const itemsPerPage = ref(8)

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'nome' },
  { title: 'Preço (R$)', key: 'preco' },
  { title: 'Descrição', key: 'descricao' },
  { title: 'Ações', key: 'actions', sortable: false },
]

const toDelete = ref<Produto | null>(null)
const confirmDialog = ref(false)

async function load() {
  loading.value = true
  error.value = null
  try {
    produtos.value = await api.listProdutos()
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(load)

function edit(id?: number) {
  if (!id) return
  router.push({ name: 'produto-edit', params: { id } })
}

function askDelete(p: Produto) {
  toDelete.value = p
  confirmDialog.value = true
}

async function confirmDelete() {
  if (!toDelete.value || !toDelete.value.id) return
  const id = toDelete.value.id
  confirmDialog.value = false
  try {
    await api.deleteProduto(id)
    produtos.value = produtos.value.filter((x) => x.id !== id)
    notifications.push('Produto removido com sucesso', 'success')
  } catch (e: any) {
    notifications.push(e.message || 'Erro ao remover', 'error')
  } finally {
    toDelete.value = null
  }
}

const filtered = computed(() => {
  if (!search.value) return produtos.value
  const q = search.value.toLowerCase()
  return produtos.value.filter((p) => (p.nome || '').toLowerCase().includes(q) || String(p.id).includes(q))
})

function formatPrice(v?: number) {
  if (v == null) return '-'
  return `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-row class="w-100" align="center">
              <v-col>
                <span class="text-h6">Produtos</span>
              </v-col>
              <v-col class="d-flex justify-end">
                <v-btn color="primary" @click="$router.push({ name: 'produto-new' })">Novo Produto +</v-btn>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="search" label="Buscar" prepend-inner-icon="mdi-magnify" />
              </v-col>
            </v-row>

            <v-alert v-if="error" type="error">{{ error }}</v-alert>
            <v-progress-linear v-if="loading" indeterminate color="primary" />

            <v-data-table :items="filtered" :items-per-page="itemsPerPage" :headers="headers" class="elevation-1">
              <template #top>
                <v-toolbar flat>
                  <v-toolbar-title>Lista de produtos</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
              </template>

              <template #item.preco="{ item }">
                {{ formatPrice(item.preco) }}
              </template>

              <template #item.nome="{ item }">
                <div>{{ item.nome }}</div>
              </template>

              <template #item.actions="{ item }">
                <div class="d-flex">
                  <v-btn small icon @click="edit(item.id)" aria-label="Editar">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn small icon color="error" @click="askDelete(item)" aria-label="Deletar">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </template>

            </v-data-table>

            <v-dialog v-model="confirmDialog" width="400">
              <v-card>
                <v-card-title>Confirmar exclusão</v-card-title>
                <v-card-text>Deseja realmente excluir o produto <strong>{{ toDelete?.nome }}</strong>?</v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn text @click="confirmDialog = false">Cancelar</v-btn>
                  <v-btn color="error" @click="confirmDelete">Excluir</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
