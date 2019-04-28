<template>
  <div class="cart">
    <van-nav-bar title="购物车"
      :right-text="rightText"
      @click-right="editCart"
      :z-index="10"
      fixed />
    <div class="nogood"
      v-if="!this.cartList.length">
      <div>购物车空空的，快去购物吧~</div>
      <van-button type="primary"
        class="btn"
        @click="goHome">去首页</van-button>
    </div>
		<div style="padding-top: 48px;">
		<van-panel v-for="(cart,index) in cartList" :title="cart.memberGoldname" :key="index">
    <van-checkbox-group class="card-goods"
      v-model="checkedGoods">
      <van-checkbox class="card-goods__item"
			  v-model="item.checked"
				@click="checkedChange(item)"
        v-for="item in cart.list"
        :key="item.productId"
        :name="item.productId">
				
        <van-card :title="item.productName"
          :num="item.productNum"
          :price="formatPrice(item.salePrice)"
          :thumb="item.productImg">
          <div slot="footer"
            class="footer">
            <span class="add"
              @click.stop="reduceCount(item,item.productNum)">
              <van-button class="btn"
                size="mini">-</van-button>
            </span>
            <span class="input"
              @click.stop="showModal(item)">
              <span class="input-edit">{{item.productNum}}</span>
            </span>
            <span class="reduce"
              @click.stop="addCount(item,item.productNum)">
              <van-button class="btn"
                size="mini">+</van-button>
            </span>
          </div>
        </van-card>
      </van-checkbox>
    </van-checkbox-group>
		</van-panel>
		</div>
    <van-submit-bar class="cart-bar"
      v-if="this.cartList.length"
      :price="totalPrice"
      label="合计"
      :button-text="isEdit?'删除':'提交订单'"
      @submit="onSubmit">
      <span @click="selectAll"
        class="selectAll">
        <van-checkbox v-model="checkedAll">{{checkedAllMsg}}</van-checkbox>
      </span>
    </van-submit-bar>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant';
import { mapGetters, mapMutations } from 'vuex';
import { updateCartCount, delFromCart, getCarList,updateCart} from '@/api/api';
export default {
  name: 'Cart',
  data() {
    return {
      cartList: [
				{
					list:[]
				}
			],
			totalPrice:0,
      checkedGoods: [],
      checkedAll: false,
      checkedAllMsg: '全选',
      isEdit: false,
      modalShow: false,
      editGood: {},
      editNum: 0,
      timer: 0
    };
  },
  activated() {
    this.init();
  },
  methods: {
    init() {		
      getCarList().then(result => {
          this.cartList = result.result;
          this.setCartTotal()
        })
        .catch(error => {
          console.log(error);
        });
    },
		setCartTotal(){
			this.checkedGoods = [];
			this.totalPrice=0
			for(var i=0;i<this.cartList.length;i++){
				var item=this.cartList[i].list;
				for(var j=0;j<item.length;j++){
					if(item[j].checked=='1'){
						item[j].checked=true;
						this.totalPrice+=item[j].salePrice*item[j].productNum
						this.checkedGoods.push(item[j].productId)
					}
					else{
						item[j].checked=false;
					}
				}
			}
			this.totalPrice=this.totalPrice*100;
		},
		update(productId, productNum, checked){
			var cartp = {
				productId: productId,
				productNum: productNum,
				checked: checked==true?"1":"0"
			}
			updateCart(cartp).then(res=>{
				this.setCartTotal()
			})
			
		},
		checkedChange(item){
			item.checked=item.checked==true?false:true;
			this.update(item.productId,item.productNum,item.checked)
		},
    editCart() {
      this.isEdit = !this.isEdit;
    },
    reduceCount(item, count) {
      if (!count && count !== 0) {
        Toast({
          position: 'bottom',
          message: '数值不正确~'
        });
        return;
      }
      if (count <= 1) {
        Toast({
          position: 'bottom',
          message: '不能再少了~'
        });
        return;
      }
      count--;
      item.productNum = count;
      this.update(item.productId,item.productNum,item.checked)
    },
    addCount(item, count) {
      if (!count && count !== 0) {
        Toast({
          position: 'bottom',
          message: '数值不正确~'
        });
        return;
      }
      if (count >= item.Goodcount) {
        Toast({
          position: 'bottom',
          message: '只有这么多了~'
        });
        return;
      }
      count++;
      item.productNum = count;
      this.update(item.productId,item.productNum,item.checked)
    },
    goHome() {
      this.$router.push('/');
    },
    formatPrice(price) {
      return price
    },
    selectAll() {
      if (this.checkedAll) {
        for (let i = 0; i < this.cartList.length; i++) {
          this.checkedGoods.push(this.cartList[i].Goodid);
        }
        this.checkedAllMsg = '全不选';
      } else {
        this.checkedGoods = [];
        this.checkedAllMsg = '全选';
      }
    },
    updateCartCountFun(id, count) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        updateCartCount({ id: id, num: count })
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            console.log(error);
          });
      }, 500);
    },
    onSubmit() {
      if (this.isEdit) {
        if (!this.checkedGoods.length) {
          Toast({
            position: 'bottom',
            message: '没有选择物品~'
          });
          return;
        }
        Dialog.confirm({
          title: '警告',
          message: '确实要删除吗?'
        }).then(() => {
          var params = {
            delId: this.checkedGoods
          };
          delFromCart(params)
            .then(result => {
              console.log(result);
              this.$toast.success('删除成功');
              this.init();
            })
            .catch(error => {
              console.log(error);
            });
        });
      } else {
        if (!this.checkedGoods.length) {
          Toast({
            position: 'bottom',
            message: '没有选择物品~'
          });
          return;
        }
        var orderGood = this.cartList.filter(item => {
          if (this.checkedGoods.indexOf(item.Goodid) !== -1) {
            return item;
          }
        });
        this.setOrderGood(orderGood);
        this.$router.push('/Order');
      }
    }
  },
  computed: {
    rightText() {
      if (this.cartList.length) {
        return this.isEdit ? '完成' : '编辑';
      } else {
        return '';
      }
    }
  },
  watch: {
    checkedGoods() {
      if (this.checkedGoods.length === this.cartList.length) {
        this.checkedAll = true;
        this.checkedAllMsg = '全不选';
      }
      if (this.checkedGoods.length < this.cartList.length) {
        this.checkedAll = false;
        this.checkedAllMsg = '全选';
      }
    }
  }
};
</script>

<style lang="stylus">
.cart
  margin-bottom 120px

.card-goods
  padding-top 5px
  padding-bottom 0
  background-color #fff

  .card-goods__item
    position relative
    background-color #fafafa
    border-bottom 1px solid #e5e5e5

    .van-checkbox__label
      width 100%
      padding 0 10px 0 15px
      box-sizing border-box

    .van-checkbox__icon
      top 50%
      left 10px
      z-index 1
      margin-top -10px
      position absolute

    .van-card__price
      color #f44

.modal-box
  margin 20px 0

.footer, .modal-box
  display flex
  justify-content center
  align-items center

  input
    outline 0
    border 0
    width 50px
    text-align center
    border-bottom 1px solid #f6b539
    margin 0 6px

  .input
    .input-edit
      padding 0 10px
      font-size 14px
      text-align center
      background-color #fafafa
      border-bottom 1px solid #f6b539
      margin 0 6px

  .btn
    width 30px
    margin 0

.nogood
  position absolute
  width 220px
  text-align center
  color #666
  left 50%
  top 50%
  transform translate(-50%, -50%)

  .btn
    margin-top 16px

.selectAll
  margin-left 10px

.cart-bar
  bottom 50px
</style>
