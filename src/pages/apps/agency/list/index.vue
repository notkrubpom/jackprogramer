<script setup>
import AddNewAgentDrawer from '@/views/apps/agency/list/AddNewAgentDrawer.vue'
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import { avatarText } from '@core/utils/formatters'

const userListStore = useUserListStore()
const searchQuery = ref('')
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref([])

// 👉 Fetching users
const fetchUsers = () => {
  userListStore.fetchUsers({
    q: searchQuery.value,
    status: selectedStatus.value,
    plan: selectedPlan.value,
    role: selectedRole.value,
    perPage: rowPerPage.value,
    currentPage: currentPage.value,
  }).then(response => {
    users.value = response.data.users.reverse()
    totalPage.value = response.data.totalPage
    totalUsers.value = response.data.totalUsers
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(fetchUsers)

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 search filters
const roles = [
  {
    title: 'Student Exchange',
    value: 'student',
  },
  {
    title: 'Work and Travel',
    value: 'worktravel',
  },
  {
    title: 'Service',
    value: 'service',
  },
  {
    title: 'Office',
    value: 'office',
  },

]

const country = [
  {
    title: 'Thailand',
    value: 'thai',
  },
  {
    title: 'England',
    value: 'england',
  },
  {
    title: 'USA',
    value: 'usa',
  },
  {
    title: 'China',
    value: 'cn',
  },
  {
    title: 'Canada',
    value: 'canada',
  },
]


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

const resolveUserRoleVariant = role => {
  if (role === 'student')
    return {
      color: 'warning',
      icon: 'tabler-user',
    }
    if (role === 'service')
    return {
      color: 'warning',
      icon: 'tabler-user',
    }
    if (role === 'student')
    return {
      color: 'warning',
      icon: 'tabler-user',
    }
    if (role === 'student')
    return {
      color: 'warning',
      icon: 'tabler-user',
    }
  
  return {
    color: 'warning',
    icon: 'tabler-user',
  }
}

const resolveUserStatusVariant = stat => {
  if (stat === 'pending')
    return 'warning'
  if (stat === 'active')
    return 'success'
  if (stat === 'inactive')
    return 'secondary'
  
  return 'primary'
}

const isAddNewAgentDrawerVisible = ref(false)

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = users.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = users.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalUsers.value } entries`
})

const addNewUser = userData => {
  userListStore.addUser(userData)

  // refetch User
  fetchUsers()
}

// 👉 List

</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard title="All Agency">
          <!-- 👉 Filters -->
          <VCardText>
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
            <VRow>
              <!-- 👉 Select Plan -->
              <VCol
                cols="12"
                sm="4"
              >
              </VCol>
              <!-- 👉 Select Status -->
              <VCol
                cols="12"
                sm="8"
              >
                <VSelect
                  v-model="selectedStatus"
                  label="Select Status"
                  :items="status"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
            </VRow>
          </VCardText>

          <VDivider />

          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <div
              class="me-3"
              style="width: 80px;"
            >
            </div>

            <VSpacer />

            <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
              <!-- 👉 Search  -->
              <div style="width: 10rem;">
                <VTextField
                  v-model="searchQuery"
                  placeholder="Search"
                  density="compact"
                />
              </div>

              <!-- 👉 Export button -->
              <VBtn
                variant="tonal"
                color="secondary"
                prepend-icon="tabler-screen-share"
              >
                Export
              </VBtn>

              <!-- 👉 Add user button -->
              <VBtn
                prepend-icon="tabler-plus"
                @click="isAddNewAgentDrawerVisible = true"
              >
                Add New User
              </VBtn>
            </div>
          </VCardText>

          <VDivider />

          <VTable class="text-no-wrap">
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col">
                  NO.
                </th>
                <th scope="col">
                  AGENCY NAME
                </th>
                <th scope="col">
                  COUNTRY
                </th>
                <th scope="col">
                  CURRENCY
                </th>
                <th scope="col">
                  STATUS
                </th>
                <th scope="col">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr
                v-for="user in users.filter(u => u.agencyName)"
                :key="user.id"
                style="height: 3.75rem;"
              >
                <!-- 👉 No.User -->
                <td>
                  <div class="d-flex align-center">

                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <RouterLink
                          :to="{ name: 'apps-user-view-id', params: { id: user.id } }"
                          class="font-weight-medium user-list-name"
                        >
                          {{ user.id }}
                        </RouterLink>
                      </h6>
                    </div>
                  </div>
                </td>

                <!-- 👉 AgencyNAME -->
                <td>
                  <span class="text-capitalize text-base">{{ user.agencyName }}</span>
                </td>

                <!-- 👉 Country -->
                <td>
                  <span class="text-base">{{ user.country }}</span>
                </td>

                <!-- 👉 Currency -->
                <td>
                    {{ user.currency }}
                </td>
                
                <!-- 👉 Status -->
                <td>
                  <VChip
                    label
                    :color="resolveUserStatusVariant(user.status)"
                    size="small"
                    class="text-capitalize"
                  >
                    {{ user.status }}
                  </VChip>
                </td>

                <!-- 👉 Actions -->
                <td
                  class="text-center"
                  style="width: 5rem;"
                >
                  <VBtn
                    icon
                    size="x-small"
                    color="default"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-edit"
                    />
                  </VBtn>

                  <VBtn
                    icon
                    size="x-small"
                    color="default"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-trash"
                    />
                  </VBtn>

                  <VBtn
                    icon
                    size="x-small"
                    color="default"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-dots-vertical"
                    />

                    <VMenu activator="parent">
                      <VList>
                        <VListItem
                          title="View"
                          :to="{ name: 'apps-user-view-id', params: { id: user.id } }"
                        />
                        <VListItem
                          title="Suspend"
                          href="javascript:void(0)"
                        />
                      </VList>
                    </VMenu>
                  </VBtn>
                </td>
              </tr>
            </tbody>

            <!-- 👉 table footer  -->
            <tfoot v-show="!users.length">
              <tr>
                <td
                  colspan="7"
                  class="text-center"
                >
                  No data available
                </td>
              </tr>
            </tfoot>
          </VTable>

          <VDivider />

          <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
            <span class="text-sm text-disabled">
              {{ paginationData }}
            </span>

            <VPagination
              v-model="currentPage"
              size="small"
              :total-visible="5"
              :length="totalPage"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 👉 Add New User -->
    <AddNewAgentDrawer
      v-model:isDrawerOpen="isAddNewAgentDrawerVisible"
      @user-data="addNewUser"
    />
  </section>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 31.6rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
