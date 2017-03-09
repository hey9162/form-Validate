angular.module('app',[])
.directive('phone',['$q','$http', function ($q, $http) {  
    return {  
        require: 'ngModel',  
        link: function (scope, ele, attrs, ctrl) {
            console.log(ctrl)
            ctrl.$asyncValidators.phone = function (modelValue, viewValue) {  
                console.log(modelValue)
                console.log(viewValue)
                var d = $q.defer();   //创建一个promise的实例对象
                $http.get('phone.json')  
                .success(function (phoneList) {  
                    if (phoneList.indexOf(parseInt(modelValue)) >= 0) {  
                        d.reject();  //失败
                    } else {  
                        d.resolve();  //成功
                    }  
                });  
                return d.promise;  
            }  
        },
    }  
}])  
.directive('username', function ($q, $http) {  
    return {  
        require: 'ngModel',  
        link: function (scope, ele, attrs, ctrl) {  
            console.log(ctrl)
            ctrl.$validators.username = function (modelValue, viewValue) {  
                if (modelValue) {  
                    return modelValue.length > 5 ? true : false;  
                };  
                return false;  
            }  
        }  
    }  
})  

// 我们可以添加我们的验证方法到ngModelController的$validators对象上

// 在$validators对象上的每个方法都接收modelValue和viewValue两个值做为参数。
// 在你绑定的验证方法返回一个值(true,false)之后，Angular会在内部调用$setValidity方法。
// 验证会在每一次输入框的值改变($setViewValue被调用)或者模型的值改变。验证发生在$parsers和$formatters成功运行之后，
// 验证不通过的项会做为ngModelController.$error的属性存储起来。


// 还有一个$asyncValidators对象，如果你的验证是异步的，则需要加验证附加在这个对象上，
// 比如说用户注册时输入手机号，我们需要在后端验证该手机号是否已经注册，这个验证方法必须
// return一个promise对象，然后在验证通过时调用延迟对象的resolve，失败时调用reject，
// 还未完成的异步的验证存储在ngModelController.$pending中。