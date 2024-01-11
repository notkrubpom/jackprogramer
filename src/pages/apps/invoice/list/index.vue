<script setup>
import { useInvoiceStore } from '@/views/apps/invoice/useInvoiceStore'
import { avatarText } from '@core/utils/formatters'

const invoiceListStore = useInvoiceStore()
const searchQuery = ref('')
const selectedStatus = ref()
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalInvoices = ref(0)
const invoices = ref([])
const selectedRows = ref([])

// 👉 Fetch Invoices
watchEffect(() => {
  invoiceListStore.fetchInvoices({
    q: searchQuery.value,
    status: selectedStatus.value,
    perPage: rowPerPage.value,
    currentPage: currentPage.value,
  }).then(response => {
    invoices.value = response.data.invoices.reverse()
    totalPage.value = response.data.totalPage
    totalInvoices.value = response.data.totalInvoices
  }).catch(error => {
    console.log(error)
  })
})

// 👉 Fetch Invoices
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = invoices.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = invoices.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalInvoices.value } entries`
})

// 👉 Invoice balance variant resolver
const resolveInvoiceBalanceVariant = (invoiceStatus, total) => {
  if (invoiceStatus === total) {
    return {
      status: 'Inactive',
      chip: { color: 'error' },
    };
  } else if (invoiceStatus === 0) {
    return {
      status: 'Active',
      chip: { color: 'success' },
    };
  } else {
    return {
      status: 'Inactive', // or use invoiceStatus if you want to display the actual value
      chip: { color: 'error' },
    };
  }
};

const status = [
  {
    title: 'Active',
    value: 'active',
  },
  {
    title: 'Inactive',
    value: 'inactive',
  },
]

const resolveInvoiceStatusVariantAndIcon = status => {
  if (status === 'pending')
    return 'warning'
  if (status === 'active')
    return 'success'
  if (status === 'inactive')
    return 'secondary'
  
  return 'primary'
}
</script>

<template>
  <VCard
    v-if="invoices"
    id="invoice-list"
  >
    <VCardText class="d-flex align-center flex-wrap gap-4">
      <!-- 👉 Rows per page -->
      <div
        class="d-flex align-center"
        style="width: 135px;"
      >
        <span class="text-no-wrap me-3">Show:</span>
        <VSelect
          v-model="rowPerPage"
          density="compact"
          :items="[10, 20, 30, 50]"
        />
      </div>

      <div class="me-3">
        <!-- 👉 Create invoice -->
        <VBtn
          prepend-icon="tabler-plus"
          :to="{ name: 'apps-invoice-add' }"
        >
          Create invoice
        </VBtn>
      </div>

      <VSpacer />

      <div class="d-flex align-center flex-wrap gap-4">
        <!-- 👉 Search  -->
        <div class="invoice-list-filter">
          <VTextField
            v-model="searchQuery"
            placeholder="Search Invoice"
            density="compact"
          />
        </div>

        <!-- 👉 Select status -->
        <div class="invoice-list-filter">
          <VSelect
            v-model="selectedStatus"
            label="Select Status"
            clearable
            clear-icon="tabler-x"
            single-line
            :items="status"
          />
        </div>
      </div>
    </VCardText>

    <VDivider />

    <!-- SECTION Table -->
    <VTable class="text-no-wrap invoice-list-table">
      <!-- 👉 Table head -->
      <thead class="text-uppercase">
        <tr>
          <th scope="col">
            NO.
          </th>
          <th scope="col">
            FULLNAME
          </th>
          <th scope="col">
          THAI NAME
          </th>

          <th
            scope="col"
            class="text-center"
          >
            ACCOUNT NUMBER
          </th>

          <th scope="col">
            STATUS
          </th>
        </tr>
      </thead>

      <!-- 👉 Table Body -->
      <tbody>
        <tr
          v-for="invoice in invoices"
          :key="invoice.id"
          style="height: 3.75rem;"
        >
          <!-- 👉 Id -->
          <td>
            <RouterLink
            :to="{ name: 'apps-invoice-preview-id', params: { id: invoice.id } }"
            >
            {{ invoice.id }}
          </RouterLink>
          </td>
          <!-- 👉 Client Avatar and Email -->
          <td>
            <div class="d-flex align-center">
              <div class="d-flex flex-column">
                <h6 class="text-base font-weight-medium mb-0">
                  {{ invoice.client.name }}
                </h6>
              </div>
            </div>
          </td>

          <!-- 👉 THAINAME -->
          <td>
            <div class="d-flex align-center">
              <div class="d-flex flex-column">
                <h6 class="text-base font-weight-medium mb-0">
                  {{ invoice.client.thainame }}
                </h6>
              </div>
            </div>
          </td>

          <!-- 👉 total -->
          <td class="text-center">
            {{ invoice.accountnum }}
          </td>

          <td class="text-center">
            <VChip
              label
              v-bind="resolveInvoiceBalanceVariant(invoice.balance, invoice.total).chip"
              size="small"
            >
              {{ resolveInvoiceBalanceVariant(invoice.balance, invoice.total).status }}
            </VChip>
          </td>

          

          <!-- 👉 Actions -->
          <td style="width: 8rem;">
            <VBtn
              icon
              variant="text"
              color="default"
              size="x-small"
            >
              <VIcon
                icon="tabler-mail"
                :size="22"
              />
            </VBtn>

            <VBtn
              icon
              variant="text"
              color="default"
              size="x-small"
              :to="{ name: 'apps-invoice-preview-id', params: { id: invoice.id } }"
            >
              <VIcon
                :size="22"
                icon="tabler-eye"
              />
            </VBtn>

            <VBtn
              icon
              variant="text"
              color="default"
              size="x-small"
            >
              <VIcon
                :size="22"
                icon="tabler-dots-vertical"
              />

              <VMenu activator="parent">
                <VList>
                  <VListItem value="active">
                    <template #prepend>
                      <VIcon
                        size="24"
                        class="me-3"
                        icon="tabler-download"
                      />
                    </template>

                    <VListItemTitle>Download</VListItemTitle>
                  </VListItem>

                  <VListItem :to="{ name: 'apps-invoice-edit-id', params: { id: invoice.id } }">
                    <template #prepend>
                      <VIcon
                        size="24"
                        class="me-3"
                        icon="tabler-pencil"
                      />
                    </template>

                    <VListItemTitle>Edit</VListItemTitle>
                  </VListItem>
                  <VListItem value="duplicate">
                    <template #prepend>
                      <VIcon
                        size="24"
                        class="me-3"
                        icon="tabler-stack"
                      />
                    </template>

                    <VListItemTitle>Duplicate</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </td>
        </tr>
      </tbody>

      <!-- 👉 table footer  -->
      <tfoot v-show="!invoices.length">
        <tr>
          <td
            colspan="8"
            class="text-center text-body-1"
          >
            No data available
          </td>
        </tr>
      </tfoot>
    </VTable>
    <!-- !SECTION -->

    <VDivider />

    <!-- SECTION Pagination -->
    <VCardText class="d-flex align-center flex-wrap gap-4 py-3">
      <!-- 👉 Pagination meta -->
      <span class="text-sm text-disabled">
        {{ paginationData }}
      </span>

      <VSpacer />

      <!-- 👉 Pagination -->
      <VPagination
        v-model="currentPage"
        size="small"
        :total-visible="5"
        :length="totalPage"
        @next="selectedRows = []"
        @prev="selectedRows = []"
      />
    </VCardText>
    <!-- !SECTION -->
  </VCard>
</template>

<style lang="scss">
#invoice-list {
  .invoice-list-actions {
    inline-size: 8rem;
  }

  .invoice-list-filter {
    inline-size: 12rem;
  }
}
</style>
