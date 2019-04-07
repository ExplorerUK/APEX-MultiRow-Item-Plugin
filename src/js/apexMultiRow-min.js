var readOnly,limit,apexItem,limitMessage,defaults={clearInputs:1,separator:":",inputSeparator:"||",onElementAdd:null,onElementRemove:null};function Plugin(e,t){this.options=defaults,readOnly=t.readOnly,limit=t.limit,limitMessage=t.limitMessage,apexItem=$(e),this.element=$(e),this.elementId=this.element.attr("id"),this.elementInput=$("<input>").attr({name:this.elementId+"Input",id:this.elementId+"Input",type:"text",class:t.itemCss,placeholder:t.itemPlaceholder,size:t.itemSize,maxlength:t.itemMaxLength}),this.addLink=$("<a>").addClass("add").css("cursor","pointer").html('<i  style="top: -4px;" class="fa fa-lg '+t.addItemIcon+'"></i><span > </span>'),this.removeLink=$("<a></i>").addClass("remove").css("cursor","pointer").html('<i style="top: -4px;left: -9px;" class="fa fa-lg '+t.removeItemIcon+'"></i><span ></span>'),this.elementInputs=null,this.elementCount=0,this.escSeparator=this.options.separator.replace(/[\-\[\]\/{}()*+?.\\^$|]/g,"\\$&"),this.escInputSeparator=this.options.inputSeparator.replace(/[\-\[\]\/{}()*+?.\\^$|]/g,"\\$&"),this.trimEx=new RegExp("^("+this.escSeparator+")+|("+this.escSeparator+")+$","gm"),this.trimExInput=new RegExp("^("+this.escInputSeparator+")+|("+this.escInputSeparator+")+$","gm"),this.init()}Plugin.prototype={init:function(){return this.element.length&&(this.elementInputs=this.fillElementsValues(this.element),this.element.hide().before(this.elementInputs)),this},clearInputs:function(e){$(":input",e).each(function(){$(this).val("")}),this.saveElementsValues()},createElement:function(e,t,n){var i=this,s=e.clone(!1),a=$("<div>").addClass("inputWrapper").hide().append(s);$("[id]",a).each(function(){$(this).attr("id",$(this).attr("id")+t)}),$("[id]",a).each(function(){$(this).attr("id",$(this).attr("name")+t)}),$(".number",s).text(t+1),i.clearInputs(a);var r=n.split(i.options.inputSeparator),p=$(":input",a);if(r.length)for(var l=0;l<r.length;l++)$(p[l]).val(r[l]);if(!readOnly)var o=i.addLink.clone(!1).click(function(e){if(e.preventDefault(),i.elementCount<limit){var t=i.createElement(i.elementInput,i.elementCount,""),n=$(this).parents(".inputWrapper").index();$(".number",t).text(n+2),$(this).parents(".inputWrapper").after(t),$(this).parents(".inputWrapper").nextAll(".inputWrapper").each(function(e){$(this).find(".number").text(n+e+2)}),t.show(0,function(){$(this).removeAttr("style")}),i.elementCount++,i.addElementEvents(t),i.saveElementsValues(),apex.jQuery(apexItem).trigger("change")}else apex.message.clearErrors(),apex.message.showErrors([{type:"error",location:"page",message:limitMessage,unsafe:!1}])}),u=i.removeLink.clone(!1).click(function(t){if(t.preventDefault(),$(".inputWrapper",i.elementInputs).length>1){var n=$(this).parents(".inputWrapper").index();$(this).parents(".inputWrapper").nextAll(".inputWrapper").each(function(e){$(this).find(".number").text(n+e+1)}),$(this).parents(".inputWrapper").hide(0,function(){$(this).remove(),i.saveElementsValues(),i.elementCount--}),apex.jQuery(apexItem).trigger("change")}else i.clearInputs($(this).parent());"function"==typeof i.options.onElementRemove&&i.options.onElementRemove(e,i)});return a.append(o).append(u),a},fillElementsValues:function(e){var t,n=e.attr("id");t=e.html().replace(/[\s\r\n]+$/,"").split(this.options.separator);var i,s=e.hasClass("required")?"required":"",a=$("<div>").attr("id",n+"Inputs").addClass("apexMultiRow");if(t.length)for(var r=0;r<t.length;r++)i=this.createElement(this.elementInput,r,t[r]).addClass(n+"Input").addClass(s).show(),a.append(i),this.elementCount++,this.addElementEvents(i);else i=this.createElement(this.elementInput,0,"").addClass(n+"Input").show(),a.append(i),this.elementCount++,this.addElementEvents(i);return a},addElementEvents:function(e){var t=this;$("[id]",e).bind("change keyup mouseup",function(){return t.saveElementsValues(),!1}),"function"==typeof t.options.onElementAdd&&t.options.onElementAdd(e,t)},saveElementsValues:function(){var e=this;if(e.elementInputs){var t=e.elementInputs.children(".inputWrapper"),n=[];t.each(function(){var t=$(":input",$(this)),i=[];$.each(t,function(){$(this).attr("name");i.push($(this).val())}),i=i.join(e.options.inputSeparator),n.push(i)});var i=n.join(e.options.separator);e.element.text(i),e.element.val(i)}}},$.fn.apexMultiRow=function(e){return this.each(function(){$.data(this,"plugin_apexMultiRow")||$.data(this,"plugin_apexMultiRow",new Plugin(this,e))})};