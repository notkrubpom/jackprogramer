export default [
  {
    title: 'Master Management',
    icon: { icon: 'tabler-smart-home' },
    children: [
      {
        title: 'Marketing Campaign',
        icon: { icon: 'tabler-brand-campaignmonitor' },
        to: 'apps-marketingc-list',
      },
      {
        title: 'Marketing Event',
        icon: { icon : 'tabler-building-store' },
        to: 'apps-marketinge-list',
      },
      {
        title: 'Member',
        to: 'apps-user-list',
        icon: { icon: 'tabler-user' },
      },
      {
        title: 'Agency & Sub Agent',
        to: 'apps-agency-list',
        icon: { icon: 'tabler-users-group' },
      },
      {
        title: 'University',
        to: 'apps-university-list',
        icon: { icon : "tabler-universe" },
      },
      {
        title: 'Product',
        to: 'apps-product-list',
        icon: { icon : "tabler-brand-producthunt" },
      },
      {
        title: 'Supplier',
        to: 'apps-supplier-list',
        icon: { icon : "tabler-brand-deliveroo" },
      },
      {
        title: 'Staff',
        to: 'apps-staff-list',
        icon: { icon : "tabler-tag-starred" },
      },
      {
        title: 'Bank',
        to: 'apps-invoice-list',
        icon: { icon: 'tabler-building-bank' },
      },
    ],
    badgeContent: '2',
    badgeClass: 'bg-light-primary text-primary',
  },
]
