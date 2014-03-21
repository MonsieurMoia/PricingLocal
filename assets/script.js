//Assign first Pricing Plan when page loads
 	$("#small-app-plan").css("display","block");

 	//Assign a default color for the default Pricing Plan when page loads
 	$("#small-app-label").addClass("text-primary");

 	//Activate jQuery Range Slider
    $(":range").rangeinput();

    //Toggle Pricing Plan shown when Range Slider Changes
    $(":range").change(function(event, value) {
  		var plan = $(":range").val();//Grab Current Plan Value in Range Slider
  		if (plan==1){
  			var planType = $("#small-app-plan");
  			var planColor = "#1cb5ea";
  			var planLabel = "#small-app-label";
  			var colorClass = "text-primary";
  			switchPlan(planType,planColor,planLabel,colorClass);
  		}
  		if(plan==2){
  			var planType = $("#medium-app-plan");
  			var planColor = "#97ce41";
  			var planLabel = "#medium-app-label";
  			var colorClass = "text-success";
  			switchPlan(planType,planColor,planLabel,colorClass);
  		}
  		if(plan==3){
  			var planType = $("#large-app-plan");
  			var planColor = "#ffb83b";
  			var planLabel = "#large-app-label";
  			var colorClass = "text-warning";
  			switchPlan(planType,planColor,planLabel,colorClass);
  		}
  	});

  	//Function for Toggling Styles in Calculator
  	function switchPlan(planType,planColor,planLabel,colorClass){
     	$(".pricing-plan").css("display","none");
     	$(".range-label").removeClass("text-primary text-success text-warning");
     	planType.css("display","block");
     	$(".handle").css("background",planColor);
     	$(planLabel).addClass(colorClass);
    }

    //Pricing Details JSON
    
    var pricingPlans = {
       "Small": {"credits":5 } , 
        "Medium": {"credits":10} , 
        "Large": {"credits":20} ,
        "Airpair" : {"credits":20},
        "CreditCost": 100
    }

    //Pricing Plans Add to Calculator
    

    var pplan = $(".pricing-plan");

    pplan.find("button").click(function(){
      var smappBtn = "sm-app-btn";
      var mdappBtn = "md-app-btn";
      var lgappBtn = "lg-app-btn";
      //If Clicked on Add Small App to Calc
      if(($(this).attr('id')) == smappBtn){
        var q = $('#small-app-ammount').find(".quantity");
        var n = parseInt(q.text(), 10);
        q.empty().append(Math.max(0, n + 1));
        sumCredits();
        $("#small-app-ammount").parents(".calc-item").removeClass("disabled");
      }
      if(($(this).attr('id')) == mdappBtn){
        var q = $('#medium-app-ammount').find(".quantity");
        var n = parseInt(q.text(), 10);
        q.empty().append(Math.max(0, n + 1));
        sumCredits();
        $("#medium-app-ammount").parents(".calc-item").removeClass("disabled");
      }
      if(($(this).attr('id')) == lgappBtn){
        var q = $('#large-app-ammount').find(".quantity");
        var n = parseInt(q.text(), 10);
        q.empty().append(Math.max(0, n + 1));
        sumCredits();
        $("#large-app-ammount").parents(".calc-item").removeClass("disabled");
      }
    });


    
    
    //SideBar Calculator

    var calcItem = $(".calc-item");//Calc item in calculator

    //Function for Substraction in Calculator
    calcItem.find(".substract").click(function() { 
      var q = $(this).siblings('.quantity');
      var n = parseInt(q.text(), 10);
      q.empty().append(Math.max(0, n - 1)); 
      if (n == 1)
      {
        $(this).parents(".calc-item").addClass("disabled");
      }  
      sumCredits(n-1);
    });

    //Function for Addition in Calculator

    calcItem.find(".add").click(function() { 
      var q = $(this).siblings('.quantity');
      var n = parseInt(q.text(), 10);
      q.empty().append(Math.max(0, n + 1));
      if (n != 1)
        {
          $(this).parents(".calc-item").removeClass("disabled");
        }
      sumCredits(n+1);
    });

    //Adding Airpair to Calculator

    var airCheck = $(".airpair-check input");

    var airBtn = $(".airpair-add");

    airBtn.click(function(){
      if (airCheck.prop('checked', false)) {
          airCheck.prop('checked', true)
      };
      if(airCheck.is(':checked')){
          airCredits = pricingPlans.Airpair.credits;
          airCheck.parents('.calc-item').removeClass("disabled");
          sumCredits(airCredits);
      }
    });
    
    var airCredits=0;

    airCheck.change(function(){
      if($(this).is(':checked')){
          airCredits = pricingPlans.Airpair.credits;
          $(this).parents('.calc-item').removeClass("disabled")
      } else {
          airCredits = 0;
          $(this).parents('.calc-item').addClass("disabled")
      }
      
      sumCredits(airCredits);
    });



    //Sum Credits and Cash in Calculator
    function sumCredits(){
      var smallappQt = parseInt($("#small-app-ammount").text());
      var mediumappQt = parseInt($("#medium-app-ammount").text());
      var largeappQt = parseInt($("#large-app-ammount").text());

      

      //Make the sum of the credits
      var totalCredits = (smallappQt*(pricingPlans.Small.credits))+(mediumappQt*(pricingPlans.Medium.credits))+(largeappQt*(pricingPlans.Large.credits))+(airCredits);

      //Make the sum of Plan Prices
      var totalPrice = ((smallappQt*(pricingPlans.Small.credits))+(mediumappQt*(pricingPlans.Medium.credits))+(largeappQt*(pricingPlans.Large.credits))+(airCredits))*(pricingPlans.CreditCost);

      //Show total Credits and Price in DOM
      $("#creditsTotal").text(totalCredits);
      setTimeout(function(){
      $("#priceTotal").text(totalPrice);}, 100); 
      console.log(totalCredits);
    }