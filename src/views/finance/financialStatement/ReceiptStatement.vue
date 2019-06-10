<template>
	<div class="big_div">
		<div class="rec_div">
			<el-row>
				<el-button type="primary">
					<span class="addClass" @click="addReceipt">新增</span>
				</el-button>
				<el-button type="primary">

					<span class="addClass" @click="handleClick(tableChecked)">删除</span>

				</el-button>
				<!-- <el-button type="primary">
					<span class="addClass">导出</span>
				</el-button>
				<el-button type="primary">
					<span class="addClass">导入</span>
				</el-button> -->
				<el-button type="primary">
					<span class="addClass">打印</span>
				</el-button><span>&nbsp;|&nbsp;</span>
				<el-button type="primary" class="addClass1">
					<span class="addClass">图形报表</span>
				</el-button>


				<el-dialog title="收据单" :visible.sync="dialogFormVisible" style="text-align: center; margin-top: -50px;">


					<el-form :model="ruleForm" :rules="rules" label-width="100px">
						<el-row>
							<el-col :span="12">
								<el-form-item label="收款金额" prop="money" class="div_form">
									<el-input v-model.number="ruleForm.money"></el-input>
								</el-form-item>

								<el-form-item label="签收人" class="div_form">
									<el-input v-model="ruleForm.receiptName" :disabled="true"></el-input>
								</el-form-item>
								<el-form-item label="付款公司" prop="companyName" class="div_form">
									<el-input v-model="ruleForm.companyName"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="收款公司" class="div_form">
									<el-input v-model="ruleForm.receiptCompanyName" :disabled="true"></el-input>
								</el-form-item>
								<el-form-item label="收款时间" class="div_form">
									<el-input v-model="ruleForm.receiptTime" :disabled="true"></el-input>
								</el-form-item>
								<el-form-item label="收款方式" class="div_form">
									<el-select v-model="ruleForm.receiptMthond">
										<el-option v-for="(v,index) in arrMethod" :label="v" :value="v" :key="index">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="备注" class="div_form">
									<el-input type="textarea" autosize placeholder="请输入内容" v-model="ruleForm.remark" :autosize="{ minRows: 4, maxRows: 6}">
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>


					<div slot="footer" class="dialog-footer">

						<el-button @click="dialogFormVisible = false">取 消</el-button>

						<!-- :disabled="disabled" -->
						<el-button v-show="!isedit" type="primary" @click="sureAdd" style="width: 100px;">
							确 定 添 加</el-button>
						<el-button v-show="isedit" type="primary" @click="sureUpdate" style="width: 100px;">
							确 定 修 改</el-button>
					</div>

				</el-dialog>

			</el-row>
		</div>
		
		<div class="block">
			<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
			 end-placeholder="结束日期" :picker-options="pickerOptions">
			 
			</el-date-picker>
			<el-button type="primary" class="addClass1">
				<span class="addClass" @click="selectReceipt">查询</span>
			</el-button>
		</div>

		<hr style="clear: both;" />

		<div class="data_div">
			<div width="60%">
				<el-table :data="tableData" border style="width: 100%" ref="multipleTable" tooltip-effect="dark" 
				@selection-change="handleSelectionChange">
					<el-table-column fixed  width="100" type="selection">
						
					</el-table-column>
					<el-table-column prop="id" label="收据编号" width="100">
					</el-table-column>
					<el-table-column prop="receiptName" label="签收人" width="100">
					</el-table-column>
					<el-table-column prop="money" label="收款金额" width="100">
					</el-table-column>
					<el-table-column prop="receiptTime" label="收款时间" width="100">
					</el-table-column>
					<el-table-column prop="receiptMthond" label="收款方式" width="100">
					</el-table-column>
					<el-table-column prop="companyName" label="付款公司" width="150">
					</el-table-column>
					<el-table-column prop="receiptCompanyName" label="收款公司" width="150">
					</el-table-column>
					<el-table-column prop="remark" label="备注" width="100">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="100">
						<template slot-scope="scope">
							<!-- 	<el-button @click="handleClick(scope.$index,scope.row.id)" type="text" size="small">删除</el-button> -->
							<el-button type="text" size="small" @click="edit(scope.$index,scope.row)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		<!-- 	分页 -->
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
				 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
				</el-pagination>
			</div>
		</div>



	</div>
</template>

<script>
	export default {

		data() {

			return {
				isedit: false,
				myindex: -1,
				/* 全选 */
				multipleSelection: [],

				/* 新增收据单 */
				dialogFormVisible: false,

				disabled: true,

				arrMethod: [
					'电子转账',
					'现金',
					'发票'
				],

				ruleForm: {
					id: '', //收据编号
					money: 0, //收款金额
					receiptName: '李四', //签收人
					companyName: '', //付款公司名
					receiptCompanyName: 'erp有限责任公司', //本系统使用的公司名
					receiptTime: new Date().toLocaleString(), //收款时间
					receiptMthond: '电子转账', //收款方式
					remark: ''
				},
				rules: {
					// 划重点————————————————————————————这里的名字和prop的名字，还有本地数据的名字必须一致才行
					companyName: [{
						required: true,
						message: '请输入付款公司名称',
						trigger: 'blur'
					}],
					money: [{
						required: true,
						message: '请输入收款金额',
						trigger: 'blur'
					}, {
						min: 1,
						type: 'number',
						message: '收款金额输入有误',
						trigger: 'blur'
					}]
				},

				/* 删除数据 */
				tableChecked: [], //对应删除按钮需要传的 参数
				ids: [], //批量删除的id


				/* 分页 */
				currentPage1: 5,
				currentPage2: 5,
				currentPage3: 5,
				currentPage4: 4,

				/* 数据显示表格 */

				tableData: [{
					id: '1', //收据编号
					money: 30000, //收款金额
					receiptName: '张三', //签收人
					companyName: 'pay有限公司', //付款公司名
					receiptCompanyName: 'erp公司', //本系统使用的公司名
					receiptTime: '2019-6-9', //收款时间
					receiptMthond: '电子转账', //收款方式
					remark: '无'
				}, {
					id: '2', //收据编号
					money: 30000, //收款金额
					receiptName: '张三', //签收人
					companyName: 'pay有限公司', //付款公司名
					receiptCompanyName: 'erp公司', //本系统使用的公司名
					receiptTime: '2019-6-9', //收款时间
					receiptMthond: '电子转账', //收款方式
					remark: '无'
				}, {
					id: '3', //收据编号
					money: 30000, //收款金额
					receiptName: '张三', //签收人
					companyName: 'pay有限公司', //付款公司名
					receiptCompanyName: 'erp公司', //本系统使用的公司名
					receiptTime: '2019-6-9', //收款时间
					receiptMthond: '电子转账', //收款方式
					remark: '无'
				}, {
					id: '4', //收据编号
					money: 30000, //收款金额
					receiptName: '张三', //签收人
					companyName: 'pay有限公司', //付款公司名
					receiptCompanyName: 'erp公司', //本系统使用的公司名
					receiptTime: '2019-6-9', //收款时间
					receiptMthond: '电子转账', //收款方式
					remark: '无'
				}, {
					id: '5', //收据编号
					money: 30000, //收款金额
					receiptName: '张三', //签收人
					companyName: 'pay有限公司', //付款公司名
					receiptCompanyName: 'erp公司', //本系统使用的公司名
					receiptTime: '2019-6-9', //收款时间
					receiptMthond: '电子转账', //收款方式
					remark: '无'
				}],
				/* 时间选择器 */
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				value1: '',
				value2: ''
			};
		},
		methods: {
			/* 根据时间段查询 */
			selectReceipt(){
				
			},


			/* 分页 */
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			/* 全选 */
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			/* 弹出新增表单 */
			addReceipt() {
				/* 新增收据单 */
				this.dialogFormVisible = true;
				this.ruleForm = {
					id: '', //收据编号
					money: 0, //收款金额
					receiptName: '李四', //签收人
					companyName: '', //付款公司名
					receiptCompanyName: 'erp有限责任公司', //本系统使用的公司名
					receiptTime: new Date().toLocaleString(), //收款时间
					receiptMthond: '电子转账', //收款方式
					remark: ''
				}
				
			},
			sureAdd() {
				//添加编号
				this.ruleForm.id = ++this.tableData.length;
				console.log(this.ruleForm.id);

				//隐藏表单
				this.dialogFormVisible = false;

				//添加数据到表单中
				this.tableData.push(this.ruleForm);
				
				
				
				
			},
			removeItems(id){
				var _this=this;
				this.tableData.forEach((ele,i)=>{
					if(ele.id==id){
						_this.tableData.splice(i,1);
					}
				})
			},
			/* 数据表格 */
			handleClick(rows) {
				
				var _this = this;
				//删除操作
				//获取该列的索引
				_this.$confirm('你确定删除该记录吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					_this.multipleSelection.forEach(element => {
						console.log("需要删除的id",element.id);
						_this.removeItems(element.id);
					});
					_this.$message({
						type: 'success',
						message: '删除成功!'
					});


				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			/* 修改数据 */
			edit(index, row) {
				/* 显示收据单 */
				//进入编辑状态
				this.isedit = true;
				this.dialogFormVisible = true;
				this.ruleForm = {
					id: row.id, //收据编号
					money: row.money, //收款金额
					receiptName: row.receiptName, //签收人
					companyName: row.companyName, //付款公司名
					receiptCompanyName: row.receiptCompanyName, //本系统使用的公司名
					receiptTime: row.receiptTime, //收款时间
					receiptMthond: row.receiptMthond, //收款方式
					remark: row.remark,
				}
				this.myindex = index; //要修改的收据编号

			},
			sureUpdate() {
				//根据form.id确认要修改的webs的id 的值
				this.tableData.splice(this.myindex, 1, this.ruleForm);
				//确认修改
				this.dialogFormVisible = false;
				//修改状态结束
				this.isedit = false

			}
		}

	}
</script>

<style>
	@import url("../../../assets/financeCss/ReceiptStatement.css");
</style>
