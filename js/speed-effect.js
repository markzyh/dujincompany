/*		$(function(){
			$(window).scroll(function() {
              var top = $(window).scrollTop();
              var wsy = $('.weyoushi').offset().top;
              
              if (top > wsy - 800 && top < wsy + 500) {
                //进入画面（第一屏）动画
				$('.section1_in').stop().animate({'opacity':'1'},3000),'swing';
				setTimeout(function(){
					$('.section1_jinzita').stop().animate({'opacity':'1','height':'auto'},1000),'easeInOutQuad';
				},0);
				setTimeout(function(){
					$('.a1_6').stop().animate({'opacity':'1','height':'172px'},1000),'easeInOutQuad';
				},300);
				setTimeout(function(){
					$('.a1_7').stop().animate({'opacity':'1','height':'218px'},1000),'easeInOutQuad';
				},600);
				setTimeout(function(){
					$('.a1_8').stop().animate({'opacity':'1','height':'172px'},1000),'easeInOutQuad';
				},900);
				setTimeout(function(){
					$('.a1_9').stop().animate({'opacity':'1','height':'172px'},1000),'easeInOutQuad';
				},1200);
				setTimeout(function(){
					$('.a1_10').stop().animate({'opacity':'1','height':'172px'},1000),'easeInOutQuad';
				},1500);
				setTimeout(function(){
					$('.a1_11').stop().animate({'opacity':'1','height':'172px'},1000),'easeInOutQuad';
				},1800);
				setTimeout(function(){
					$('.a1_12').stop().animate({'opacity':'1','height':'172px'},1000),'easeInOutQuad';
				},2100);
				setTimeout(function(){
					$('.a1_13').stop().animate({'opacity':'1','height':'340px'},1000),'easeInOutQuad';
				},2400);
				setTimeout(function(){
					$('.a1_14').stop().animate({'opacity':'1','height':'172px'},1000),'easeInOutQuad';
				},2700);
				setTimeout(function(){
					$('.a1_15').stop().animate({'opacity':'1','height':'172px'},1000),'easeInOutQuad';
				},3000);
				setTimeout(function(){
					$('.a1_16').stop().animate({'opacity':'1','height':'172px'},1000),'easeInOutQuad';
				},3300);
				setTimeout(function(){
					$('.a1_17').stop().animate({'opacity':'1','height':'248px'},1000),'easeInOutQuad';
				},3600);
				setTimeout(function(){
					$('.a1_18').stop().animate({'opacity':'1','height':'94px','bottom':'-275px'},1000),'easeInOutQuad';
				},5000);

				setTimeout(function(){
					$('.top_wechat').stop().animate({'opacity':'1','bottom':'189px'},1000),'easeInOutQuad';
				},2400);

              }
			})
		})*/
		$(function(){
				$('.weyoushi').mouseover(function(){
					$('.section1_in').stop().animate({'opacity':'1'},3000),'swing';
				setTimeout(function(){
					$('.section1_jinzita').stop().animate({'opacity':'1','height':'auto'},1000),'easeInOutQuad';
				},0);
				setTimeout(function(){
					$('.a1_6').stop().animate({'opacity':'1'},1000),'easeInOutQuad';
				},300);
				setTimeout(function(){
					$('.a1_7').stop().animate({'opacity':'1'},1000),'easeInOutQuad';
				},600);
				setTimeout(function(){
					$('.a1_8').stop().animate({'opacity':'1'},1000),'easeInOutQuad';
				},900);
				setTimeout(function(){
					$('.a1_9').stop().animate({'opacity':'1'},1000),'easeInOutQuad';
				},1200);
				setTimeout(function(){
					$('.a1_10').stop().animate({'opacity':'1'},1000),'easeInOutQuad';
				},1500);
				setTimeout(function(){
					$('.a1_11').stop().animate({'opacity':'1'},1000),'easeInOutQuad';
				},1800);
				setTimeout(function(){
					$('.a1_12').stop().animate({'opacity':'1'},1000),'easeInOutQuad';
				},2100);
				setTimeout(function(){
					$('.a1_13').stop().animate({'opacity':'1'},1000),'easeInOutQuad';
				},2400);
				setTimeout(function(){
					$('.a1_14').stop().animate({'opacity':'1'},1000),'easeInOutQuad';
				},2700);
				setTimeout(function(){
					$('.a1_15').stop().animate({'opacity':'1'},1000),'easeInOutQuad';
				},3000);
				setTimeout(function(){
					$('.a1_16').stop().animate({'opacity':'1'},1000),'easeInOutQuad';
				},3300);
				setTimeout(function(){
					$('.a1_17').stop().animate({'opacity':'1'},1000),'easeInOutQuad';
				},3600);
				setTimeout(function(){
					$('.a1_18').stop().animate({'opacity':'1','height':'94px','bottom':'0'},1000),'easeInOutQuad';
				},5000);

				/*setTimeout(function(){
					$('.top_wechat').stop().animate({'opacity':'1','bottom':'189px'},1000),'easeInOutQuad';
				},2400);*/
				})
				function autoSlideInUp(attr,speed){
					setTimeout(function(){
						$(attr).animate({
						opacity:0.8,
						bottom:'-110%',
						bottom:0,
						opacity:1
						},1000)
					},speed*1000)
					
				}
				function autoSlideInDown(attrs,speeds){
					setTimeout(function(){
						$(attrs).animate({
						opacity:0.8,
						top:'-50%',
						top:'60px',
						opacity:1
						},1000)
					},speeds*1000)
					
				}
			
				function autoSlideInRight(attrs,speeds){
					setTimeout(function(){
						$(attrs).animate({
						opacity:0.8,
						left:'-110%',
						left:'0',
						opacity:1
						},1000)
					},speeds*1000)
					
				}
				
				$('.speed_intro_wide').mouseover(function(){
					autoSlideInDown('.speed_common_title2',0.3)
					
					autoSlideInRight('.speed_intro_text .li1',0.7)
					autoSlideInRight('.speed_intro_text .li2',1.1)
					autoSlideInRight('.speed_intro_text .li3',1.5)
					autoSlideInRight('.speed_intro_text .li4',1.9)
					autoSlideInRight('.speed_intro_text .li5',2.3)
					autoSlideInRight('.speed_intro_text .li6',2.7)
					
					autoSlideInUp('.speed_intro_pro .speed_pro_01',3.1)
					autoSlideInUp('.speed_intro_pro .speed_pro_02',3.5)
					autoSlideInUp('.speed_intro_pro .speed_pro_03',3.9)
					autoSlideInUp('.speed_intro_pro .speed_pro_04',4.3)
					autoSlideInUp('.speed_intro_pro .speed_pro_05',4.7)
					autoSlideInUp('.speed_intro_pro .speed_pro_06',5.1)
					autoSlideInUp('.speed_intro_pro .speed_pro_07',5.5)
					autoSlideInUp('.speed_intro_pro .speed_pro_08',5.9)
					
					autoSlideInUp('.dou_btn2 a',6.3)
					
					/*for(var i=0;i<$('.speed_intro_pro li').length;i++){
						(function(e){
							setTimeout(function(){
								console.log(e)
							},5000)
							
							//autoSlideInUp('.speed_intro_pro li',(e+1)*1000)
						})(i)
						
					}*/
				})
			
		})