import Layout from '@/layout'

const finance = {
	path: '/finance',
	component: Layout,
	//重定向地址，在面包屑中点击会重定向去的地址
	redirect: '/finance/OperationState',
	//唔，就是名字
	name: 'finance',
	meta: {
		//是导航栏出现的名字
		title: '财务管理',
		//在导航栏名字前面的图标
		icon: 'money'
	},
	children: [{
			path: 'OperationState',
			name: 'OperationState',
			component: () => import('@/views/finance/operationState/OperationState'),
			meta: {
				title: '经营状况'
			}
		},
		{
			roles: ['admin', 'editor'],
			path: 'MoneyTransferStatement', //这是子导航的路径
			component: () => import('@/views/index'), //指向目录，并且该目录下有一个index.vue文件
			name: 'MoneyTransferStatement', //子导航的名字
			redirect: '/finance/MoneyTransferStatement/MoneyTransferStatement1',
			meta: {
				title: '财务报表'
			}, //显示在导航栏的名字
			children: [{
					roles: ['admin', 'editor'],
					path: 'ReceiptStatement', //这是子导航的路径
					component: () => import('@/views/finance/financialStatement/ReceiptStatement'), //这是子导航vue文件所在地方
					name: 'ReceiptStatement', //子导航的名字
					meta: {
						title: '收款单'
					}
				}, {
					roles: ['admin', 'editor'],
					path: 'PaymentStatement', //这是子导航的路径
					component: () => import('@/views/finance/financialStatement/PaymentStatement'), //这是子导航vue文件所在地方
					name: 'PaymentStatement', //子导航的名字
					meta: {
						title: '付款单'
					}
				},
				{
					roles: ['admin', 'editor'],
					path: 'VerificationSheetStatement', //这是子导航的路径
					component: () => import('@/views/finance/financialStatement/VerificationSheetStatement'), //这是子导航vue文件所在地方
					name: 'VerificationSheetStatement', //子导航的名字
					meta: {
						title: '核销单'
					}
				}, {
					roles: ['admin', 'editor'],
					path: 'statementOfAccount', //这是子导航的路径
					component: () => import('@/views/finance/financialStatement/statementOfAccount'), //这是子导航vue文件所在地方
					name: 'statementOfAccount', //子导航的名字
					meta: {
						title: '对账单'
					}
				},
				{
					roles: ['admin', 'editor'],
					path: 'ProfitStatement', //这是子导航的路径
					component: () => import('@/views/finance/financialStatement/ProfitStatement'), //这是子导航vue文件所在地方
					name: 'ProfitStatement', //子导航的名字
					meta: {
						title: '利润表'
					}
				}, {
					roles: ['admin', 'editor'],
					path: 'SalesStatement', //这是子导航的路径
					component: () => import('@/views/finance/financialStatement/SalesStatement'), //这是子导航vue文件所在地方
					name: 'SalesStatement', //子导航的名字
					meta: {
						title: '销售报表'
					}
				}, {
					path: 'MoneyTransferStatement1', //这是子导航的路径
					component: () => import('@/views/finance/financialStatement/MoneyTransferStatement'), //这是子导航vue文件所在地方
					name: 'MoneyTransferStatement1', //子导航的名字
					meta: {
						title: '资金转账单'
					}
				},
				{
					roles: ['admin', 'editor'],
					path: 'OtherIncomeStatement', //这是子导航的路径
					component: () => import('@/views/finance/financialStatement/OtherIncomeStatement'), //这是子导航vue文件所在地方
					name: 'OtherIncomeStatement', //子导航的名字
					meta: {
						title: '其他收入单'
					}
				},
				{
					roles: ['admin', 'editor'],
					path: 'OtherPaymentStatement', //这是子导航的路径
					component: () => import('@/views/finance/financialStatement/OtherPaymentStatement'), //这是子导航vue文件所在地方
					name: 'OtherPaymentStatement', //子导航的名字
					meta: {
						title: '其他支出单'
					}
				},

				{
					roles: ['admin', 'editor'],
					path: 'PurchaseSalesStatement', //这是子导航的路径
					component: () => import('@/views/finance/financialStatement/PurchaseSalesStatement'), //这是子导航vue文件所在地方
					name: 'PurchaseSalesStatement', //子导航的名字
					meta: {
						title: '采购销售费用单'
					}
				},

				{
					roles: ['admin', 'editor'],
					path: 'SalesDetailsStatement', //这是子导航的路径
					component: () => import('@/views/finance/financialStatement/SalesDetailsStatement'), //这是子导航vue文件所在地方
					name: 'SalesDetailsStatement', //子导航的名字
					meta: {
						title: '商品销售详情表'
					}
				}

			]
		}, {
			path: 'AccountPayableSubsidiary',
			name: 'AccountPayableSubsidiary',
			component: () => import('@/views/index'),
			meta: {
				title: '运营明细表'
			},
			redirect: '/finance/AccountPayableSubsidiary/AccountPayableSubsidiary1',
			children: [{
					roles: ['admin', 'editor'], //能访问的角色
					path: 'AccountPayableSubsidiary1', //这是子导航的路径
					component: () => import('@/views/finance/operatingSubsidiary/AccountPayableSubsidiary'), //这是子导航vue文件所在地方
					name: 'AccountPayableSubsidiary1', //子导航的名字
					meta: {
						title: '应付款明细表'
					}
				},
				{
					roles: ['admin', 'editor'], //能访问的角色
					path: 'AccountReceivableSubsidiary', //这是子导航的路径
					component: () => import('@/views/finance/operatingSubsidiary/AccountReceivableSubsidiary'), //这是子导航vue文件所在地方
					name: 'AccountReceivableSubsidiary', //子导航的名字
					meta: {
						title: '应收款明细表'
					}
				},
				{
					roles: ['admin', 'editor'], //能访问的角色
					path: 'FreightSubsidiary', //这是子导航的路径
					component: () => import('@/views/finance/operatingSubsidiary/FreightSubsidiary'), //这是子导航vue文件所在地方
					name: 'FreightSubsidiary', //子导航的名字
					meta: {
						title: '运费明细报表'
					}
				},
				{
					roles: ['admin', 'editor'], //能访问的角色
					path: 'OrderSubsidiary', //这是子导航的路径
					component: () => import('@/views/finance/operatingSubsidiary/OrderSubsidiary'), //这是子导航vue文件所在地方
					name: 'OrderSubsidiary', //子导航的名字
					meta: {
						title: '订单明细报表'
					}
				},
				{
					roles: ['admin', 'editor'], //能访问的角色
					path: 'RefundSubsidiary', //这是子导航的路径
					component: () => import('@/views/finance/operatingSubsidiary/RefundSubsidiary'), //这是子导航vue文件所在地方
					name: 'RefundSubsidiary', //子导航的名字
					meta: {
						title: '订单明细报表'
					}
				}
			]
		}
	]
}

export default finance
