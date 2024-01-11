<script setup>
import { VIcon } from 'vuetify/lib/components/VIcon/VIcon'
import sliderBar1 from '@/assets/images/illustrations/sidebar-pic-1.png'

const websiteAnalytics = [
  {
    name: 'Website Analytics',
    slideImg: sliderBar1,
    data: [
      {
        number: '1.5k',
        text: 'Sessions',
      },
    ],
  },
]
</script>

<template>
  <VCard color="primary">
    <VCarousel
      cycle
      :continuous="false"
      :show-arrows="false"
      hide-delimiter-background
      hide-delimiters
      height="auto"
    >
      <VCarouselItem
        v-for="item in websiteAnalytics"
        :key="item.name"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <h6 class="text-h4 text-white mb-1">
                Hello World
              </h6>
            </VCol>

            <VCol
              cols="12"
              sm="6"
              order="2"
              order-sm="1"
            >
              <VRow>
                <VCol
                  cols="12"
                  class="pb-0"
                >
                  <p class="font-weight-semibold">
                    {{ item.name }}
                  </p>
                </VCol>

                <VCol
                  v-for="d in item.data"
                  :key="d.number"
                  cols="6"
                  class="text-no-wrap"
                >
                  <VChip
                    label
                    class="me-2"
                  >
                    {{ d.number }}
                  </VChip>
                  <span style="font-size:20px;">{{ d.text }}</span>
                </VCol>
              </VRow>
            </VCol>

            <VCol
              cols="12"
              sm="6"
              order="1"
              order-sm="2"
              class="position-relative text-center"
            >
            </VCol>
          </VRow>
        </VCardText>
      </VCarouselItem>
    </VCarousel>
  </VCard>
</template>

<style lang="scss">
.card-website-analytics-img {
  block-size: 160px;
}

@media screen and (min-width: 600px) {
  .card-website-analytics-img {
    position: absolute;
    margin: auto;
    inset-block-end: 40px;
    inset-block-start: -1rem;
    inset-inline-end: 1rem;
  }
}
</style>

