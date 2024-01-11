import mock from '@/@fake-db/mock'
import { paginateArray } from '@/@fake-db/utlis'
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import avatar2 from '@/assets/images/avatars/avatar-2.png'
import avatar3 from '@/assets/images/avatars/avatar-3.png'
import avatar4 from '@/assets/images/avatars/avatar-4.png'
import avatar5 from '@/assets/images/avatars/avatar-5.png'
import avatar6 from '@/assets/images/avatars/avatar-6.png'
import avatar7 from '@/assets/images/avatars/avatar-7.png'
import avatar8 from '@/assets/images/avatars/avatar-8.png'

const now = new Date()
const currentMonth = now.toLocaleString('default', { month: '2-digit' })

const database = [
  {
    id: 1,
    issuedDate: `${now.getFullYear()}-${currentMonth}-13`,
    client: {
      address: '86691 Mackenzie Light Suite 568',
      company: 'Deleon Inc LLC',
      companyEmail: 'gjordan@fernandez-coleman.com',
      country: 'Costa Rica',
      contact: '(682) 804-6506',
      name: 'Mary Garcia',
      thainame: 'เมรี่ การ์เซีย',
    },
    service: 'Template Customization',
    total: 2719,
    avatar: '',
    invoiceStatus: 'Active',
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-04`,
  },
  {
    id: 2,
    issuedDate: `${now.getFullYear()}-${currentMonth}-18`,
    client: {
      address: '86580 Sarah Bridge',
      company: 'Farmer, Johnson and Anderson Group',
      companyEmail: 'robertscott@garcia.com',
      country: 'Cameroon',
      contact: '(775) 366-0411',
      name: 'Crystal Mays',
      thainame: 'คริสทัล เมย์',
    },
    service: 'Template Customization',
    total: 3325,
    avatar: '',
    invoiceStatus: 'Active',
    balance: '$361',
    dueDate: `${now.getFullYear()}-${currentMonth}-02`,
  },
  {
    id: 3,
    issuedDate: `${now.getFullYear()}-${currentMonth}-29`,
    client: {
      address: '49709 Edwin Ports Apt. 353',
      company: 'Sherman-Johnson PLC',
      companyEmail: 'desiree61@kelly.com',
      country: 'Macedonia',
      contact: '(510) 536-6029',
      name: 'Nicholas Tanner',
      thainame: 'นิโคลาส แทนเนอร์',
    },
    service: 'Template Customization',
    total: 3851,
    avatar: '',
    invoiceStatus: 'Active',
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-25`,
  },
  {
    id: 4,
    issuedDate: `${now.getFullYear()}-${currentMonth}-07`,
    client: {
      address: '3856 Mathis Squares Apt. 584',
      company: 'Byrd LLC PLC',
      companyEmail: 'jeffrey25@martinez-hodge.com',
      country: 'Congo',
      contact: '(253) 230-4657',
      name: 'Justin Richardson',
      thainame: 'จัสติน ริชาร์ดซัน',
    },
    service: 'Template Customization',
    total: 5565,
    avatar: '',
    invoiceStatus: 'Active',
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-06`,
  },
  {
    id: 5,
    issuedDate: `${now.getFullYear()}-${currentMonth}-21`,
    client: {
      address: '141 Adrian Ridge Suite 550',
      company: 'Stone-Zimmerman Group',
      companyEmail: 'john77@anderson.net',
      country: 'Falkland Islands (Malvinas)',
      contact: '(612) 546-3485',
      name: 'Jennifer Summers',
      thainame: 'เจนนิเฟอร์ ซัมเมอร์',
    },
    service: 'Template Customization',
    total: 3313,
    avatar: avatar7,
    invoiceStatus: 'Inctive',
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-09`,
  },
  {
    id: 6,
    issuedDate: `${now.getFullYear()}-${currentMonth}-31`,
    client: {
      address: '01871 Kristy Square',
      company: 'Yang, Hansen and Hart PLC',
      companyEmail: 'ywagner@jones.com',
      country: 'Germany',
      contact: '(203) 601-8603',
      name: 'Richard Payne',
      thainame: 'ริชาร์ด เพย์น',
    },
    service: 'Template Customization',
    total: 5181,
    avatar: '',
    invoiceStatus: 'Active',
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-29`,
  },
  {
    id: 7,
    issuedDate: `${now.getFullYear()}-${currentMonth}-12`,
    client: {
      address: '075 Smith Views',
      company: 'Jenkins-Rosales Inc',
      companyEmail: 'calvin07@joseph-edwards.org',
      country: 'Colombia',
      contact: '(895) 401-4255',
      name: 'Lori Wells',
      thainame: 'ลอรี่ เวลส์',
    },
    service: 'Template Customization',
    total: 2869,
    avatar: avatar4,
    invoiceStatus: 'Active',
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-22`,
  },
  {
    id: 8,
    issuedDate: `${now.getFullYear()}-${currentMonth}-10`,
    client: {
      address: '2577 Pearson Overpass Apt. 314',
      company: 'Mason-Reed PLC',
      companyEmail: 'eric47@george-castillo.com',
      country: 'Paraguay',
      contact: '(602) 336-9806',
      name: 'Tammy Sanchez',
      thainame: 'แทมมี่ ซานเชส',
    },
    service: 'Unlimited Extended License',
    total: 4836,
    avatar: '',
    invoiceStatus: 'Active',
    balance: 0,
    dueDate: `${now.getFullYear()}-${currentMonth}-22`,
  },
  {
    id: 9,
    issuedDate: `${now.getFullYear()}-${currentMonth}-20`,
    client: {
      address: '1770 Sandra Mountains Suite 636',
      company: 'Foster-Pham PLC',
      companyEmail: 'jamesjoel@chapman.net',
      country: 'Western Sahara',
      contact: '(936) 550-1638',
      name: 'Dana Carey',
      thainame: 'ดาน่า คาเรย์',
    },
    service: 'UI/UX Design & Development',
    total: 4263,
    avatar: '',
    invoiceStatus: 'Inactive',
    balance: '$762',
    dueDate: `${now.getFullYear()}-${currentMonth}-12`,
  },
  {
    id: 10,
    issuedDate: `${now.getFullYear()}-${currentMonth}-19`,
    client: {
      address: '78083 Laura Pines',
      company: 'Richardson and Sons LLC',
      companyEmail: 'pwillis@cross.org',
      country: 'Bhutan',
      contact: '(687) 660-2473',
      name: 'Andrew Burns',
      thainame: 'แอนดรู เบิร์นส์',
    },
    accountnum: '416-101-6689',
    service: 'Unlimited Extended License',
    total: 3171,
    avatar: avatar3,
    invoiceStatus: 'Active',
    balance: '-$205',
    dueDate: `${now.getFullYear()}-${currentMonth}-25`,
  },
]

mock.onGet('/apps/invoices').reply(config => {
  const { q = '', status = null, accountnum = null,thainame = null, perPage = 0, currentPage = 1, startDate = '', endDate = '' } = config.params ?? {}
  const queryLowered = q.toLowerCase()
  let filteredInvoices = database.filter(invoice => ((invoice.client.name.toLowerCase().includes(queryLowered)
        || invoice.client.companyEmail.toLowerCase().includes(queryLowered)
        || invoice.total.toString().includes(queryLowered)
        || invoice.issuedDate.toString().includes(queryLowered)
        || invoice.id.toString().includes(queryLowered))
        && invoice.invoiceStatus === (status || invoice.invoiceStatus) && invoice.thainame === (thainame || invoice.thainame) 
        && invoice.accountnum === (accountnum || invoice.accountnum) )).reverse()
  if (startDate && endDate) {
    filteredInvoices = filteredInvoices.filter(invoiceObj => {
      const start = new Date(startDate).getTime()
      const end = new Date(endDate).getTime()
      const issuedDate = new Date(invoiceObj.issuedDate).getTime()
      
      return issuedDate >= start && issuedDate <= end
    })
  }
  const totalPage = Math.ceil(filteredInvoices.length / perPage) ? Math.ceil(filteredInvoices.length / perPage) : 1
  const totalInvoices = filteredInvoices.length
  
  return [200, { invoices: paginateArray(filteredInvoices, perPage, currentPage), totalPage, totalInvoices }]
})

// 👉 Get a single invoice
mock.onGet(/\/apps\/invoices\/\d+/).reply(config => {
  // Get event id from URL
  const invoiceId = config.url?.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  const id = Number(invoiceId)
  const invoice = database.find(e => e.id === id)
  if (!invoice)
    return [404, { message: 'Unable to find the requested invoice' }]

  const responseData = {
    invoice,
    paymentDetails: {
      totalDue: '$12,110.55',
      bankName: 'American Bank',
      country: 'United States',
      iban: 'ETD95476213874685',
      swiftCode: 'BR91905',
    },
  }

  return [200, responseData]
})

// 👉 Get Client
mock.onGet('/apps/invoice/clients').reply(() => {
  const clients = database.map(invoice => invoice.client)
  
  return [200, clients.slice(0, 5)]
})
