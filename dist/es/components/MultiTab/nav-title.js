import{SlotsMixin as t}from"../../utils/mixins.js";var e={mixins:[t],props:{title:{type:String,default:""},index:{type:Number,default:0}},methods:{genText:function(){return this.slots()||this.title}},render:function(){return(0,arguments[0])("div",{class:"nav-title"},[this.genText()])}};export{e as default};
