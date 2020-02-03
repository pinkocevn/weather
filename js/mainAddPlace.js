swiper.appendSlide(`
<li class="swiper-slide">
    <article class="weather-main">
        <div class="weather-textbox">
            날씨 <span class="weather-info">맑음</span> | 미세먼지 <span class="dust-info">좋음</span>
        </div>
        <div class="weather-img">
            <img src="img/weather/01d.svg" alt="맑음">
            <img src="img/dust/dust1.svg" alt="미세먼지 좋음">
        </div>
        <div class="weather-info">
            <span class="weather-temp">21°</span>
            <div class="weather-high-low">
                최고 <span class="weather-high">23</span>° / 최저 <span class="weather-low">11</span>°
            </div>
            <span class="weather-yesterday">어제보다 <span class="weather-gap">1</span>° <span class="higher">높아요!</span><span class="lower">낮아요!</span></span>
        </div>
        <div class="dust-bar">
            <img src="img/dust-bar.svg" alt="미세먼지 수치">
            <div class="dust-value-bar"></div>
        </div>
    </article>
    <article class="weather-detail swiper-no-swiping">
        <div class="weather-time">
            <ul class="weather-time-list">
                <li>
                    오후 1시
                    <div class="time-weather">
                        <div class="sprite-big sunny"></div>
                        <span class="time-deg">21°</span>
                    </div>
                    <div class="time-dust">
                        <div class="sprite-big dust-good"></div>
                        <span class="time-dust-value">좋음</span>
                    </div>
                </li>
                <li>
                    오후 2시
                    <div class="time-weather">
                        <div class="sprite-big cloudy"></div>
                        <span class="time-deg">21°</span>
                    </div>
                    <div class="time-dust">
                        <div class="sprite-big dust-soso"></div>
                        <span class="time-dust-value">보통</span>
                    </div>
                </li>
                <li>
                    오후 3시
                    <div class="time-weather">
                        <div class="sprite-big rainy-hard"></div>
                        <span class="time-deg">21°</span>
                    </div>
                    <div class="time-dust">
                        <div class="sprite-big dust-bad"></div>
                        <span class="time-dust-value">나쁨</span>
                    </div>
                </li>
                <li>
                    오후 4시
                    <div class="time-weather">
                        <div class="sprite-big thunder"></div>
                        <span class="time-deg">21°</span>
                    </div>
                    <div class="time-dust">
                        <div class="sprite-big dust-terrible"></div>
                        <span class="time-dust-value">매우나쁨</span>
                    </div>
                </li>
                <li>
                    오후 5시
                    <div class="time-weather">
                        <div class="sprite-big sunny"></div>
                        <span class="time-deg">21°</span>
                    </div>
                    <div class="time-dust">
                        <div class="sprite-big dust-good"></div>
                        <span class="time-dust-value">좋음</span>
                    </div>
                </li>
                <li>
                    오후 6시
                    <div class="time-weather">
                        <div class="sprite-big sunny-cloudy"></div>
                        <span class="time-deg">21°</span>
                    </div>
                    <div class="time-dust">
                        <div class="sprite-big dust-good"></div>
                        <span class="time-dust-value">좋음</span>
                    </div>
                </li>
                <li>
                    오후 7시
                    <div class="time-weather">
                        <div class="sprite-big rainy"></div>
                        <span class="time-deg">21°</span>
                    </div>
                    <div class="time-dust">
                        <div class="sprite-big dust-good"></div>
                        <span class="time-dust-value">좋음</span>
                    </div>
                </li>
                <li>
                    오후 8시
                    <div class="time-weather">
                        <div class="sprite-big rainy-thunder"></div>
                        <span class="time-deg">21°</span>
                    </div>
                    <div class="time-dust">
                        <div class="sprite-big dust-good"></div>
                        <span class="time-dust-value">좋음</span>
                    </div>
                </li>
                <li>
                    오후 9시
                    <div class="time-weather">
                        <div class="sprite-big cloudy-night"></div>
                        <span class="time-deg">21°</span>
                    </div>
                    <div class="time-dust">
                        <div class="sprite-big dust-good"></div>
                        <span class="time-dust-value">좋음</span>
                    </div>
                </li>
                <li>
                    오후 10시
                    <div class="time-weather">
                        <div class="sprite-big sunny-night"></div>
                        <span class="time-deg">21°</span>
                    </div>
                    <div class="time-dust">
                        <div class="sprite-big dust-good"></div>
                        <span class="time-dust-value">좋음</span>
                    </div>
                </li>
                <li>
                    오후 11시
                    <div class="time-weather">
                        <div class="sprite-big snowy"></div>
                        <span class="time-deg">21°</span>
                    </div>
                    <div class="time-dust">
                        <div class="sprite-big dust-good"></div>
                        <span class="time-dust-value">좋음</span>
                    </div>
                </li>
                <li>
                    오전 12시
                    <div class="time-weather">
                        <div class="sprite-big snowy-thunder"></div>
                        <span class="time-deg">21°</span>
                    </div>
                    <div class="time-dust">
                        <div class="sprite-big dust-good"></div>
                        <span class="time-dust-value">좋음</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="weather-today-detail">
            <h2>상세날씨</h2>
            <div class="container">
                <div>
                    <img src="img/umbrella.svg" alt="">
                    강수량
                    <ul>
                        <li>없음</li>
                        <li>0.0mm</li>
                    </ul>
                </div> 
                <div>
                    <img src="img/water-drop.svg" alt="">
                    습도
                    <ul>
                        <li>건조</li>
                        <li>11%</li>
                    </ul>
                </div> 
                <div>
                    <img src="img/UV.svg" alt="">
                    자외선
                    <ul>
                        <li>보통</li>
                        <li>4</li>
                    </ul>
                </div> 
                <div>
                    <img src="img/wind.svg" alt="">
                    북서풍
                    <ul>
                        <li>약함</li>
                        <li>3m/s</li>
                    </ul>
                </div> 
            </div>
        </div>
        <div class="weather-weekly">
            <ul>
                <li class="active"><a href="#weather-tab">주간 날씨</a></li>
                <li><a href="#dust-tab">주간 미세먼지</a></li>
            </ul>
            <div class="weather-tab-contents">
                <div id="weather-tab" style="display: block;">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>날씨</th>
                                <th>강수량</th>
                                <th>최고/최저</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>01/13 (월)</td>
                            <td><i class="sprite-small sunny"></i></td>
                            <td>0%</td>
                            <td>21°/11°</td>
                            </tr>
                            <tr>
                                <td>01/14 (화)</td>
                                <td><i class="sprite-small sunny"></i></td>
                                <td>0%</td>
                                <td>21°/11°</td>
                            </tr>
                            <tr>
                                <td>01/15 (수)</td>
                                <td><i class="sprite-small sunny"></i></td>
                                <td>0%</td>
                                <td>21°/11°</td>
                            </tr>
                            <tr>
                                <td>01/16 (목)</td>
                                <td><i class="sprite-small sunny"></i></td>
                                <td>0%</td>
                                <td>21°/11°</td>
                            </tr>
                            <tr>
                                <td>01/17 (금)</td>
                                <td><i class="sprite-small sunny"></i></td>
                                <td>0%</td>
                                <td>21°/11°</td>
                            </tr>
                            <tr>
                                <td>01/18 (토)</td>
                                <td><i class="sprite-small sunny"></i></td>
                                <td>0%</td>
                                <td>21°/11°</td>
                            </tr>
                            <tr>
                                <td>01/19 (일)</td>
                                <td><i class="sprite-small sunny"></i></td>
                                <td>0%</td>
                                <td>21°/11°</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="dust-tab">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>미세먼지</th>
                                <th>초미세먼지</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01/13 (월)</td>
                                <td>
                                    <div>
                                        <i class="sprite-small dust-soso"></i>보통
                                    </div>
                                </td >
                            <td>
                                    <div>
                                        <i class="sprite-small dust-soso"></i>보통
                                    </div>
                            </td>
                            </tr>
                            <tr>
                                <td>01/14 (화)</td>
                                <td>
                                    <div>
                                        <i class="sprite-small dust-soso"></i>보통
                                    </div>
                                </td >
                            <td>
                                    <div>
                                        <i class="sprite-small dust-soso"></i>보통
                                    </div>
                            </td>
                            </tr>
                            <tr>
                                <td>01/15 (수)</td>
                                <td>
                                    <div>
                                        <i class="sprite-small dust-soso"></i>보통
                                    </div>
                                </td >
                            <td>
                                    <div>
                                        <i class="sprite-small dust-soso"></i>보통
                                    </div>
                            </td>
                            </tr>
                            <tr>
                                <td>01/16 (목)</td>
                                <td>
                                    <div>
                                        <i class="sprite-small dust-soso"></i>보통
                                    </div>
                                </td >
                            <td>
                                    <div>
                                        <i class="sprite-small dust-soso"></i>보통
                                    </div>
                            </td>
                            </tr>
                            <tr>
                                <td>01/17 (금)</td>
                                <td>
                                    <div>
                                        <i class="sprite-small dust-soso"></i>보통
                                    </div>
                                </td >
                            <td>
                                    <div>
                                        <i class="sprite-small dust-soso"></i>보통
                                    </div>
                            </td>
                            </tr>
                            <tr>
                                <td>01/18 (토)</td>
                                <td>
                                    <div>
                                        <i class="sprite-small dust-soso"></i>보통
                                    </div>
                                </td >
                            <td>
                                    <div>
                                        <i class="sprite-small dust-soso"></i>보통
                                    </div>
                            </td>
                            </tr>
                            <tr>
                                <td>01/19 (일)</td>
                                <td>
                                    <div>
                                        <i class="sprite-small dust-soso"></i>보통
                                    </div>
                                </td >
                            <td>
                                    <div>
                                        <i class="sprite-small dust-soso"></i>보통
                                    </div>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="sunrise-sunset container">
            <h2>일출/일몰</h2>
            <img src="img/sunrise-sunset.svg">
            <div class="today-sun">
                <span>06:40</span>
                <span>17:45</span>
            </div>
            <div class="tomorrow-sun">
                <span>내일</span>
                <div>
                    <span><i class="sprite-small sunrise"></i>06:45</span>
                    <span><i class="sprite-small sunset"></i>17:45</span>
                </div>
            </div>
        </div>
    </article>
</li>
`)