mapboxgl.accessToken = 'pk.eyJ1Ijoic2F0b3NoaTcxOTAiLCJhIjoiY2twN3lkdHQxMDI3czJxb2YzN2w4aW1mMyJ9.f87Vwo-X8sPHt6wUEhGajg';
    
//起動時の表示
$(window).on('load',function(){
  $("#splash").delay(1000).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
  $("#splash_logo").delay(1200).fadeOut('slow');//ロゴを1.2秒（1200ms）待機してからフェードアウト
});

  const bounds = [
  [136.83258933284668, 35.49557519024344],
  [137.0030202272223, 35.59164888935217]
  ];

const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [136.92339108110815, 35.55095829855529], // starting position
        zoom: 14.5, // starting zoom
  maxBounds: bounds,
    });

    // マップの読み込みが完了するまで待ちます。
    map.on('load', () => {

//スライダー
      slider.addEventListener('input', (e) => {
        // Adjust the layers opacity. layer here is arbitrary - this could
        // be another layer name found in your style or a custom layer
        // added on the fly using `addSource`.
        map.setPaintProperty(
            '演習林-林班',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );

        // Value indicator
        sliderValue.textContent = e.target.value + '%';
    });
//スライダー
      
      // マップの読み込みが完了するまで待ちます。
      map.addSource('mapbox-dem', {
'type': 'raster-dem',
'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
'tileSize': 512,
'maxzoom': 14
});
// DEMソースを誇張された高さの地形レイヤーとして追加します
map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1 });


      
      //ベースマップ

      //全国最新写真(シームレス)
      map.addSource("saisinsyasin", {
        type: "raster",
        tiles: ["https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg"],
        tileSize: 256
    });
    map.addLayer({
        id: "saisinsyasin",
        type: "raster",
        source: "saisinsyasin",
        minzoom: 0,
        maxzoom: 24
    });

        //空中写真(1979年頃)
        map.addSource("kutyu", {
          type: "raster",
          tiles: ["https://cyberjapandata.gsi.go.jp/xyz/gazo2/{z}/{x}/{y}.jpg"],
          tileSize: 256
      });
      map.addLayer({
          id: "kutyu",
          type: "raster",
          source: "kutyu",
          minzoom: 0,
          maxzoom: 24
      });
      
      //地理院タイル標準
         map.addSource("hyouzyun", {
        type: "raster",
        tiles: ["https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"],
        tileSize: 256
    });
    map.addLayer({
        id: "hyouzyun",
        type: "raster",
        source: "hyouzyun",
        minzoom: 0,
        maxzoom: 24
    });

    // 標高
    map.addSource("ensyoku", {
        type: "raster",
        tiles: ["https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png"],
        tileSize: 256
    });
    map.addLayer({
        id: "ensyoku",
        type: "raster",
        source: "ensyoku",
        minzoom: 0,
        maxzoom: 24
    });

       // 陰影起伏図
       map.addSource("ineikizyou", {
        type: "raster",
        tiles: ["https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png"],
        tileSize: 256
    });
    map.addLayer({
        id: "ineikizyou",
        type: "raster",
        source: "ineikizyou",
        minzoom: 0,
        maxzoom: 24
    });

    // 傾斜量図白黒
    map.addSource("keisyasirokuro", {
        type: "raster",
        tiles: ["https://cyberjapandata.gsi.go.jp/xyz/slopemap/{z}/{x}/{y}.png"],
        tileSize: 256
    });
    map.addLayer({
        id: "keisyasirokuro",
        type: "raster",
        source: "keisyasirokuro",
        minzoom: 0,
        maxzoom: 22
    });

    // 傾斜区分図
    map.addSource("keiyakubun", {
      type: "raster",
      tiles: ["https://api.mapbox.com/styles/v1/satoshi7190/ckukj6anah93i18oeywuegg9f/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2F0b3NoaTcxOTAiLCJhIjoiY2twN3lkdHQxMDI3czJxb2YzN2w4aW1mMyJ9.f87Vwo-X8sPHt6wUEhGajg"],
      tileSize: 256
  });
  map.addLayer({
      id: "keiyakubun",
      type: "raster",
      source: "keiyakubun",
      minzoom: 0,
      maxzoom: 22
  });

      // 傾斜量図なだれ
      map.addSource("keisyanadare", {
        type: "raster",
        tiles: ["https://cyberjapandata.gsi.go.jp/xyz/slopezone1map/{z}/{x}/{y}.png"],
        tileSize: 256
    });
    map.addLayer({
        id: "keisyanadare",
        type: "raster",
        source: "keisyanadare",
        minzoom: 0,
        maxzoom: 22
    });
    
      
      // 植生図
    map.addSource("syokusei", {
        type: "raster",
        tiles: ["https://map.ecoris.info/tiles/vege67hill/{z}/{x}/{y}.png"],
        tileSize: 256
    });
    map.addLayer({
        id: "syokusei",
        type: "raster",
        source: "syokusei",
        minzoom: 0,
        maxzoom: 22
    });
      
       // 地質図
    map.addSource("tisitu", {
        type: "raster",
        tiles: ["https://api.mapbox.com/styles/v1/satoshi7190/ckugj1dmtcnzc18np1ztau6k3/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2F0b3NoaTcxOTAiLCJhIjoiY2twN3lkdHQxMDI3czJxb2YzN2w4aW1mMyJ9.f87Vwo-X8sPHt6wUEhGajg"],
        tileSize: 256
    });
    map.addLayer({
        id: "tisitu",
        type: "raster",
        source: "tisitu",
        minzoom: 0,
        maxzoom: 22
    });

   // 活断層図
    map.addSource("katudansou", {
        type: "raster",
        tiles: ["https://cyberjapandata.gsi.go.jp/xyz/afm/{z}/{x}/{y}.png"],
        tileSize: 256
    });
    map.addLayer({
        id: "katudansou",
        type: "raster",
        source: "katudansou",
        minzoom: 0,
        maxzoom: 22
    });   
      
    // CS立体
    map.addSource("csrittai", {
        type: "raster",
        tiles: [ "https://api.mapbox.com/styles/v1/satoshi7190/ckuginqj5dcbw18oen843uchz/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2F0b3NoaTcxOTAiLCJhIjoiY2twN3lkdHQxMDI3czJxb2YzN2w4aW1mMyJ9.f87Vwo-X8sPHt6wUEhGajg"],
        tileSize: 256
    });
    map.addLayer({
        id: "csrittai",
        type: "raster",
        source: "csrittai",
        minzoom: 0,
        maxzoom: 22
    });

    //赤色立体10
    map.addSource("sekisyoku", {
      type: "raster",
      tiles: [ "https://cyberjapandata.gsi.go.jp/xyz/sekishoku/{z}/{x}/{y}.png"],
      tileSize: 256
  });
  map.addLayer({
      id: "sekisyoku",
      type: "raster",
      source: "sekisyoku",
      minzoom: 0,
      maxzoom: 22
  });

  //Google Maps
  map.addSource("google", {
    type: "raster",
    tiles: [ "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"],
    tileSize: 256
});
map.addLayer({
    id: "google",
    type: "raster",
    source: "google",
    minzoom: 0,
    maxzoom: 22
});

//OpenStreetMap
map.addSource("osm", {
  type: "raster",
  tiles: [ "http://tile.thunderforest.com/cycle/{z}/{x}/{y}.png"],
  tileSize: 256
});
map.addLayer({
  id: "osm",
  type: "raster",
  source: "osm",
  minzoom: 0,
  maxzoom: 22
});

    //磁気
    map.addSource("ziki", {
      type: "raster",
      tiles: [ "https://cyberjapandata.gsi.go.jp/xyz/jikizu2015_chijiki_d/{z}/{x}/{y}.png"],
      tileSize: 256
  });
  map.addLayer({
      id: "ziki",
      type: "raster",
      source: "ziki",
      minzoom: 0,
      maxzoom: 22
  });
  
    //アカデミー施設図面(β)
    map.addSource("zumen", {
      type: "raster",
      tiles: [ "https://api.mapbox.com/styles/v1/satoshi7190/ckuh15pyyd5ll18npwt9kikgx/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2F0b3NoaTcxOTAiLCJhIjoiY2twN3lkdHQxMDI3czJxb2YzN2w4aW1mMyJ9.f87Vwo-X8sPHt6wUEhGajg"],
      tileSize: 256
  });
  map.addLayer({
      id: "zumen",
      type: "raster",
      source: "zumen",
      minzoom: 0,
      maxzoom: 22
  });

    // レイヤ設定
    var Map_BaseLayer = {
        m_mono: "衛星写真",
        saisinsyasin: "全国最新写真(シームレス)",
        kutyu: "空中写真(1979年頃)",
        hyouzyun: "国土地理院地図",
        ensyoku: "色別標高図",
        ineikizyou: "陰影起伏図",
        keisyasirokuro: "傾斜量図(白黒)",
        keiyakubun: "傾斜区分図(カラー)",
        keisyanadare: "全国傾斜量区分図(雪崩関連)",
        syokusei: "植生図",
        tisitu: "地質図",
        katudansou: "活断層図",
        csrittai: "CS立体図",
        sekisyoku: "赤色立体図(10mメッシュ)",
        google: "グーグルマップ",
        osm: "オープンストリートマップ",
        ziki: "磁気図(偏角)/偏角一覧図",
        zumen: "アカデミー施設図面(ベータ版)"
    };

    // レイヤメニュー作成
    for (var i = 0; i < Object.keys(Map_BaseLayer).length; i++) {
        // レイヤID取得
        var id = Object.keys(Map_BaseLayer)[i];
        // aタグ作成
        var link = document.createElement("a");
        link.href = "#";
        // id追加
        link.id = id;
        // 名称追加
        link.textContent = Map_BaseLayer[id];

        // 初期表示m_mono以外非表示
        if (id === "m_mono") {
            link.className = "active";
        } else {
            map.setLayoutProperty(id, "visibility", "none");
            link.className = "";
        }

        //aタグクリック処理
        link.onclick = function (e) {
            // id取得
            var clickedLayer = this.id;
            e.preventDefault();
            e.stopPropagation();

            // ON/OFF状態取得
            var visibility = map.getLayoutProperty(clickedLayer, "visibility");

            // ON/OFF判断
            if (visibility === "visible") {
            } else {
                for (var j = 0; j < Object.keys(Map_BaseLayer).length; j++) {
                    // レイヤID取得
                    var ch_id = Object.keys(Map_BaseLayer)[j];

                    // レイヤの表示・非表示
                    if (ch_id === clickedLayer) {
                        // クリックしたレイヤを表示
                        this.className = "active";
                        map.setLayoutProperty(clickedLayer, "visibility", "visible");
                    } else {
                        // クリックしたレイヤ以外を非表示
                        var ch_obj = document.getElementById(ch_id);
                        ch_obj.className = "";
                        map.setLayoutProperty(ch_id, "visibility", "none");
                    }
                }
            }
        };

        // レイヤメニューにレイヤ追加
        var layers = document.getElementById("menu2");
        layers.appendChild(link);
    }
        //データ読み込み
      map.addSource('ensyurin', {
            type: 'vector',
            url: 'mapbox://satoshi7190.ckr8wsgl907jy23nxsh2iuwyb-1nqkg'
        });
 
      map.addSource('kounai', {
            type: 'vector',
            url: 'mapbox://satoshi7190.ckrerno6n6cm820o1n5we29uw-7qhzu'
        });
      
        map.addSource('kokuyurin', {
            type: 'vector',
            url: 'mapbox://satoshi7190.cku9slodv0wgc27rs708mp6b1-8me7t'
        });
 
       map.addSource('ensyurinhani', {
            type: 'vector',
            url: 'mapbox://satoshi7190.cku9v9gln078620p3nm2lfq97-2bjuv'
        });
      
      map.addSource('ensyurinsikenti', {
            type: 'vector',
            url: 'mapbox://satoshi7190.ckukunmh91thv28nup0rfmyrq-4dsu3'
        });

        map.addSource('dosyakeikaiY', {
          type: 'vector',
          url: 'mapbox://satoshi7190.ckukv2m3i0sjg23mm847auwif-75gyi'
      });

      map.addSource('dosyakeikaiR', {
        type: 'vector',
        url: 'mapbox://satoshi7190.ckukvgg451pby2bphqgrjs87b-9e8np'
    });

    map.addSource('mapillary', {
      type: 'vector',
      tiles: ['https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=MLY|6234781469926596|410eca8443ab630243fba3aa6fb87b88'],
      minzoom: 6,
      maxzoom: 14
  });
      
//レイヤー読み込み
      map.addLayer({
            'id': '校内建物ラベル',
            'source': 'kounai',
            'source-layer': 'original.geojson',
            'type': 'symbol',
            "filter": [
                "match",
                ["get", "name"],
                [
                    "ウッドラボ",
                    "森林総合研究所",
                    "加工棟",
                    "森の工房",
                    "フォレストラボ",
                    "メディアラボ",
                    "林業機械学習棟",
                    "アカデミーセンター",
                    "森のコテージ",
                    "森の情報センター",
                    "製材棟",
                    "テクニカルセンターB",
                    "テクニカルセンターA",
                    "森林総合教育センター(morinos)",
                    "研修棟",
                    "ウッドデッキ",
                    "テクニカルグラウンド",
                    "オープンラボ",
                    "車庫",
                ],
                true,
                false
            ],
            'layout': {
              'visibility': 'visible',
              "text-field": ["to-string", ["get", "name"]],
                "text-size": 14
            },
            "paint": {
                "text-halo-color": "hsl(0, 4%, 100%)",
                "text-halo-width": 1,
                "text-color": "#000000"
            } 
          });

      map.addLayer({
          'id': '川',
          'type': 'line',
          'source': 'ensyurin',
          'source-layer': 'ensyurin',
          "filter": ["match", ["get", "Name"], ["川"], true, false],
          'layout': {
          'visibility': 'visible'
          },
          'paint': {
          "line-opacity": 0.8,
                "line-width": 4,
                "line-color": "#0f7acc"
          }
          });
      
      map.addLayer({
         "id": '国有林-林班',
            "type": 'fill',
            "source": "kokuyurin",
            "source-layer": "kokuyurin",
            "layout": {
              'visibility': 'none'
            },
            "paint": {
                "fill-opacity": 0.4,
                "fill-color": [
                    "match",
                    ["get", "国有林_樹種１"],
                    ["アカマツ"],
                    "hsl(0, 73%, 52%)",
                    ["スギ"],
                    "#3a9310",
                    ["ヒノキ"],
                    "#4adea5",
                    ["他Ｌ"],
                    "#ecbd22",
                    ["天ヒノキ"],
                    "#34eac2",
                    "#000000"
                ],
                "fill-antialias": false
            },
        });
      
       map.addLayer({
          'id': '国有林-林班境界',
          'type': 'line',
          'source': 'kokuyurin',
          'source-layer': 'kokuyurin',
          'layout': {
          'visibility': 'none'
          },
          'paint': {
          },
          });
      
            map.addLayer({
            'id': '国有林-ラベル',
            'source': 'kokuyurin',
            'source-layer': 'kokuyurin',
            'type': 'symbol',
            'layout': {
              'visibility': 'none',
              "text-field": [
                    "case",
                    ["match", ["get", "国有林_樹種１"], ["他Ｌ"], true, false],
                    ["to-string", ["concat", ["get", "国有林_名前"], "\n", "広葉樹"]],
                    [
                        "match",
                        ["get", "国有林_林小班名称"],
                        ["3142_林班_イ", "3147_林班_イ", "3147_林班_ロ", "3149_林班_イ"],
                        true,
                        false
                    ],
                    ["to-string", ["get", "国有林_名前"]],
                    [
                        "to-string",
                        [
                            "concat",
                            ["get", "国有林_名前"],
                            "\n",
                            ["get", "国有林_樹種１"],
                            " ",
                            ["+", ["get", "国有林_最新林齢１"], 3],
                            "年生"
                        ]
                    ]
                ],
              "text-max-width": 12,
                "text-size": 14
            },
            'paint': {
              "text-halo-color": "hsl(0, 2%, 100%)",
                "text-halo-width": 1
            }
          });
      
        map.addLayer({
         "id": '演習林-林班',
            "type": 'fill',
            "source": "ensyurin",
            "source-layer": "ensyurin",
            "filter": [
                "match",
                ["get", "樹種"],
                ["スギ", "ヒノキ", "草地", "広葉樹", "スラッシュマ", "その他岩石", "アカマツ"],
                true,
                false
            ],
            "layout": {
              'visibility': 'visible'
              
            },
            "paint": {
                "fill-opacity": 0.4,
                "fill-color": [
                    "match",
                    ["get", "樹種"],
                    ["スギ"],
                    "hsl(101, 80%, 32%)",
                    ["スラッシュマ"],
                    "hsl(295, 71%, 44%)",
                    ["草地"],
                    "hsl(226, 79%, 52%)",
                    ["ヒノキ"],
                    "hsl(157, 69%, 58%)",
                    ["広葉樹"],
                    "hsl(46, 84%, 53%)",
                    ["アカマツ"],
                    "hsl(0, 73%, 52%)",
                    ["その他岩石"],
                    "hsl(33, 69%, 53%)",
                    "#000000"
                ],
                "fill-antialias": false
            }
         
        });
      
      map.addLayer({
          'id': '演習林-林班境界',
          'type': 'line',
          'source': 'ensyurin',
          'source-layer': 'ensyurin',
          "filter": [
                "match",
                ["get", "樹種"],
                ["スギ", "ヒノキ", "草地", "広葉樹", "スラッシュマ", "その他岩石", "アカマツ"],
                true,
                false
            ],
          'layout': {
          'visibility': 'visible'
          },
          'paint': {
         
          }
          });
      
      map.addLayer({
            'id': '演習林-ラベル',
            'source': 'ensyurin',
            'source-layer': 'ensyurin',
            'type': 'symbol',
            "filter": [
                "match",
                ["get", "樹種"],
                ["スギ", "ヒノキ", "草地", "広葉樹", "スラッシュマ", "その他岩石", "アカマツ"],
                true,
                false
          ],
            'layout': {
              'visibility': 'visible',
               "text-field": [
                    "match",
                    ["get", "樹種"],
                    ["広葉樹"],
                    [
                        "to-string",
                        ["concat", ["get", "小林班ID"], "\n", ["get", "樹種"]]
                    ],
                    ["草地"],
                    [
                        "to-string",
                        ["concat", ["get", "小林班ID"], "\n", ["get", "樹種"]]
                    ],
                    ["その他岩石"],
                    [
                        "to-string",
                        ["concat", ["get", "小林班ID"], "\n", ["get", "樹種"]]
                    ],
                    [
                        "to-string",
                        [
                            "concat",
                            ["get", "小林班ID"],
                            "\n",
                            ["get", "樹種"],
                            " ",
                            ["+", ["get", "林齢"], 2],
                            "年生"
                        ]
                    ]
                ],
                "text-max-width": 12,
                "text-size": 14
            },
            "paint": {"text-halo-color": "#ffffff", "text-halo-width": 1}
          });
      
       map.addLayer({
          'id': '未来の森づくり',
          'type': 'line',
          'source': 'ensyurinhani',
          'source-layer': 'ensyurinhani',
          "filter": ["match", ["get", "Name"], ["未来の森づくり施業区域"], true, false],
          'layout': {
          'visibility': 'visible'
          },
          "paint": {"line-width": 4, "line-color": "#a3a815"}
        
          });
      
          map.addLayer({
            "id": '土砂災害警戒区域イエローゾーン',
               "type": 'fill',
               "source": "dosyakeikaiY",
               "source-layer": "dosyakeikaiY",
               "layout": {
                 'visibility': 'none'
               },
               "paint": {"fill-color": "hsl(56, 84%, 42%)", "fill-opacity": 0.4}
           });

           map.addLayer({
            'id': '土砂災害警戒区域イエローゾーンラベル',
            'source': 'dosyakeikaiY',
            'source-layer': 'dosyakeikaiY',
            'type': 'symbol',
            'layout': {
              'visibility': 'none',
              "text-field": ["concat", ["get", "年月日"], "\n", ["get", "現象種類"]]
            },
            "paint": {"text-halo-color": "#ffffff", "text-halo-width": 1}
          });

          map.addLayer({
            "id": '土砂災害警戒区域レッドゾーン',
               "type": 'fill',
               "source": "dosyakeikaiR",
               "source-layer": "dosyakeikaiR",
               "layout": {
                 'visibility': 'none'
               },
               "paint": {"fill-color": "hsl(0, 100%, 53%)", "fill-opacity": 0.4}
           });

           map.addLayer({
            'id': '土砂災害警戒区域レッドゾーンラベル',
            'source': 'dosyakeikaiR',
            'source-layer': 'dosyakeikaiR',
            'type': 'symbol',
            'layout': {
              'visibility': 'none',
              "text-field": ["concat", ["get", "年月日"], "\n", ["get", "現象種類"]]
            },
            "paint": {"text-halo-color": "#ffffff", "text-halo-width": 1}
          });

          map.addLayer({
            "id": '演習林-試験地',
               "type": 'fill',
               "source": "ensyurinsikenti",
               "source-layer": "ensyurinsikenti",
               "layout": {
                 'visibility': 'none'
               },
               "paint": {"fill-opacity": 0.4, "fill-color": "hsl(196, 89%, 55%)"}
           });

           map.addLayer({
            'id': '演習林-試験地ラベル',
            'source': 'ensyurinsikenti',
            'source-layer': 'ensyurinsikenti',
            'type': 'symbol',
            'layout': {
              'visibility': 'none',
              "text-field": [
                "match",
                ["get", "活用期間"],
                ["不明～"],
                ["to-string", ["concat", "？年～", "\n", ["get", "活用内容"]]],
                [
                    "to-string",
                    ["concat", ["get", "活用期間"], "\n", ["get", "活用内容"]]
                ]
            ]
            },
            "paint": {"text-halo-color": "#ffffff", "text-halo-width": 1},
          });

      map.addLayer({
          'id': '歩道',
          'type': 'line',
          'source': 'ensyurin',
          'source-layer': 'ensyurin',
          "filter": ["match", ["get", "Name"], ["道"], true, false],
          'layout': {
          'visibility': 'visible',
            "line-join": "bevel"
          },
          'paint': {
            "line-opacity": 0.8,
         "line-color": "#808080",
                "line-width": 5
          },
          });
      
      map.addLayer({
         "id": '自力建設',
            "type": 'fill',
            "source": "kounai",
            "source-layer": "original.geojson",
            "filter": [
                 "match",
                ["get", "name"],
                [
                    "森の中の四寸傘",
                    "SOMA’s Hut(ソマズハット)",
                    "こならのみち",
                    "森湊灯台",
                    "桂の湯殿",
                    "おうらいの間",
                    "活木処",
                    "森のインターチェンジ",
                    "森のいちだんらく",
                    "ほたるの川床",
                    "里山獣肉学舎",
                    "森のシェアオフィス",
                    "Oasis(オアシス)",
                    "地空楼",
                    "Coboki(こびき)",
                    "Switch(スイッチ)",
                    "みさきのちゃや",
                    "木漏れ日の塔",
                    "風の円居",
                    "アラカシのだんだん"],
                true,
                false
            ],
            "layout": {
              'visibility': 'visible' 
            },
            "paint": {"fill-color": "hsl(29, 93%, 46%)", "fill-opacity": 0.64
            },
         
        });
      
      map.addLayer({
            'id': '自力建設ラベル',
            'source': 'kounai',
            'source-layer': 'original.geojson',
            'type': 'symbol',
            "filter": [
                 "match",
                ["get", "name"],
                [
                    "森の中の四寸傘",
                    "SOMA’s Hut(ソマズハット)",
                    "こならのみち",
                    "森湊灯台",
                    "桂の湯殿",
                    "おうらいの間",
                    "活木処",
                    "森のインターチェンジ",
                    "森のいちだんらく",
                    "ほたるの川床",
                    "里山獣肉学舎",
                    "森のシェアオフィス",
                    "Oasis(オアシス)",
                    "地空楼",
                    "Coboki(こびき)",
                    "Switch(スイッチ)",
                    "みさきのちゃや",
                    "木漏れ日の塔",
                    "風の円居",
                    "アラカシのだんだん"],
                true,
                false
            ],
            'layout': {
              'visibility': 'visible',
              "text-field": ["to-string", ["get", "name"]],
                "text-size": 14
            },
            "paint": {
                "text-halo-color": "hsl(0, 0%, 0%)",
                "text-halo-width": 1,
                "text-color": "#ef9271"
            } 
          });
      
      map.addLayer({
          'id': '演習林-全体境界',
          'type': 'line',
          'source': 'ensyurinhani',
          'source-layer': 'ensyurinhani',
          "filter": ["match", ["get", "Name"], ["演習林範囲"], true, false],
          'layout': {
          'visibility': 'visible'
          },
          "paint": {
                "line-color": "#e42525",
                "line-opacity": 0.75,
                "line-width": 4
            }
          });

          map.addLayer({
            'id': 'mapillary-sequences',
            'type': 'line',
            'source': 'mapillary',
            'source-layer': 'sequence',
            'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
            },
            'paint': {
              'line-color': '#05CB63',
              'line-width': 1
              }
            });

            map.addLayer({
              'id': 'mapillary-images',
              'type': 'circle',
              'source': 'mapillary',
              'source-layer': 'image',
              'layout': {
                'visibility': 'none'},
              'paint': {
                  'circle-color': '#05CB63',
                  'circle-radius': 5,
              }
          });
      
      map.addLayer({
         "id": 'その地地点',
            "type": 'circle',
            "source": "ensyurin",
            "source-layer": "ensyurin",
            "filter": [
                "match",
                ["get", "Name"],
                [
                    "チェーンゲート",
                    "大杉",
                    "屏風岩",
                    "トイレ",
                    "見晴らし岩",
                    "車止めゲート",
                    "眺の岩",
                    "昼飯岩",
                    "炭焼き小屋",
                    "東屋",
                    "ねじれ松",
                    "ゲート",
                    "馬の背岩",
                    "東屋(立ち入り禁止)",
                    "古城山山頂",
                    "古城山ふれあいの森管理棟",
                    "蛇尾滝",
                    "山の神"
                ],
                true,
                false
            ],
            "layout": {
              'visibility': 'visible' 
            },
            "paint": {
                "circle-stroke-color": "hsl(0, 0%, 100%)",
                "circle-stroke-width": 2,
                "circle-color": "hsl(223, 91%, 47%)"
            },
         
        });
      
      map.addLayer({
            'id': 'その他ラベル',
            "source": "ensyurin",
            "source-layer": "ensyurin",
            'type': 'symbol',
            "filter": [
             "match",
                ["get", "Name"],
                [
                    "山の神",
                    "大杉",
                    "炭焼き小屋",
                    "チェーンゲート",
                    "屏風岩",
                    "トイレ",
                    "見晴らし岩",
                    "車止めゲート",
                    "眺の岩",
                    "昼飯岩",
                    "東屋",
                    "ねじれ松",
                    "ゲート",
                    "馬の背岩",
                    "蛇尾滝",
                    "東屋(立ち入り禁止)",
                    "美濃市運動公園",
                    "古城山ふれあいの森管理棟",
                    "古城山山頂",
                    "梅山駅",
                    "百沢第２池",
                    "百沢第３池",
                    "百沢第４池",
                    "鉄塔",
                    "新池",
                    "毛鹿洞池"
                ],
                true,
                false
            ],
            'layout': {
              'visibility': 'visible',
              "text-field": ["to-string", ["get", "Name"]],
                "text-offset": [0, -1]
            },
             "paint": {
                "text-halo-color": "#000000",
                "text-halo-width": 1,
                "text-color": "hsl(245, 76%, 80%)"
            },
          });
      
      map.addLayer({
         "id": 'サインポール',
            "type": 'circle',
            "source": "ensyurin",
            "source-layer": "ensyurin",
            "filter": [
                "match",
                ["get", "Name"],
                ["ポール1", "ポール2", "ポール3", "ポール4", "ポール5", "ポール6", "ポールA"],
                true,
                false
            ],
            "layout": {
              'visibility': 'visible' 
            },
           "paint": {
                "circle-stroke-color": "hsl(0, 0%, 100%)",
                "circle-stroke-width": 2,
                "circle-radius": [
                    "match",
                    ["get", "Name"],
                    ["ポール1", "ポール2", "ポール3", "ポール4", "ポール5", "ポール6", "ポールA"],
                    6,
                    5
                ],
                "circle-color": "hsl(0, 87%, 43%)"
            },
         
        });
      
      map.addLayer({
            'id': 'サインポールラベル',
            "source": "ensyurin",
            "source-layer": "ensyurin",
            'type': 'symbol',
            "filter": [
                "match",
                ["get", "Name"],
                ["ポール1", "ポール2", "ポール3", "ポール4", "ポール5", "ポール6", "ポールA"],
                true,
                false
            ],
            'layout': {
              'visibility': 'visible',
              "text-field": ["to-string", ["get", "Name"]],
                "text-offset": [0, -1]
            },
            "paint": {
                "text-halo-color": "#000000",
                "text-halo-width": 1,
                "text-color": [
                    "match",
                    ["get", "Name"],
                    ["ポール1", "ポール2", "ポール3", "ポール4", "ポール5", "ポール6", "ポールA"],
                    "hsl(0, 95%, 64%)",
                    "hsl(245, 76%, 80%)"
                ]
            },
          });
      
      map.addLayer({
          'id': '電線',
          'type': 'line',
          'source': 'ensyurin',
          'source-layer': 'ensyurin',
          "filter": ["match", ["get", "Name"], ["電線"], true, false],
          'layout': {
          'visibility': 'none',
            "line-join": "bevel"
          },
          "paint": {"line-gap-width": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    14.335,
                    1,
                    15,
                    6,
                    17.528,
                    60,
                    18.436,
                    100,
                    20,
                    300,
                    22,
                    1000
                ]}
          });
      
    });

    //マップが「アイドル」状態になる前にレンダリングされた最後のフレームの後。
    map.on('idle', () => {
        //これらの2つのレイヤーがマップに追加されていない場合は、中止します
        if (!map.getLayer('校内建物ラベル') || !map.getLayer('川')) {
            return;
        }

        //レイヤーのIDを列挙します。
        const toggleableLayerIds = ['演習林-林班', '演習林-林班境界', '演習林-ラベル', '演習林-全体境界', '未来の森づくり', '歩道','川', '自力建設', '自力建設ラベル', 'サインポール', 'サインポールラベル', 'その地地点', 'その他ラベル','校内建物ラベル'];



        //各レイヤーに対応するトグルボタンを設定します。
        for (const id of toggleableLayerIds) {
            //ボタンがすでに設定されているレイヤーをスキップします。
            if (document.getElementById(id)) {
                continue;
            }

            //リンクを作成します。
            const link = document.createElement('a');
            link.id = id;
            link.href = '#';
            link.textContent = id;
            link.className = 'active';

            
          
            //トグルがクリックされたときにレイヤーを表示または非表示にします。
            link.onclick = function (e) {
                const clickedLayer = this.textContent;
                e.preventDefault();
                e.stopPropagation();

                const visibility = map.getLayoutProperty(
                    clickedLayer,
                    'visibility'
                );

                //レイアウトオブジェクトのvisibilityプロパティを変更して、レイヤーの可視性を切り替えます。
                if (visibility === 'visible') {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                    this.className = '';
                } else {
                    this.className = 'noactive';
                    map.setLayoutProperty(
                        clickedLayer,
                        'visibility',
                        'none'
                    );
                }
              
              if (visibility === 'visible') {
map.setLayoutProperty(clickedLayer, 'visibility', 'none');
this.className = '';
} else {
this.className = 'active';
map.setLayoutProperty(
clickedLayer,
'visibility',
'visible'
);
}
            };

            const layers = document.getElementById('menu');
            layers.appendChild(link);
        }

        const toggleableLayerIds2 = ['演習林-試験地', '演習林-試験地ラベル', '国有林-林班', '国有林-林班境界', '国有林-ラベル', '土砂災害警戒区域イエローゾーン', '土砂災害警戒区域イエローゾーンラベル', '土砂災害警戒区域レッドゾーン', '土砂災害警戒区域レッドゾーンラベル', '電線', 'mapillary-sequences', 'mapillary-images'];


        //各レイヤーに対応するトグルボタンを設定します。
        for (const id of toggleableLayerIds2) {
           //ボタンがすでに設定されているレイヤーをスキップします。
           if (document.getElementById(id)) {
               continue;
           }
   
           //リンクを作成します。
           const link = document.createElement('a');
           link.id = id;
           link.href = '#';
           link.textContent = id;
           link.className = 'noactive';
         
           //トグルがクリックされたときにレイヤーを表示または非表示にします。
           link.onclick = function (e) {
               const clickedLayer = this.textContent;
               e.preventDefault();
               e.stopPropagation();
   
               const visibility = map.getLayoutProperty(
                   clickedLayer,
                   'visibility'
               );
   
               //レイアウトオブジェクトのvisibilityプロパティを変更して、レイヤーの可視性を切り替えます。
               if (visibility === 'visible') {
                   map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                   this.className = '';
               } else {
                   this.className = 'noactive';
                   map.setLayoutProperty(
                       clickedLayer,
                       'visibility',
                       'none'
                   );
               }
             
             if (visibility === 'visible') {
   map.setLayoutProperty(clickedLayer, 'visibility', 'none');
   this.className = '';
   } else {
   this.className = 'active';
   map.setLayoutProperty(
   clickedLayer,
   'visibility',
   'visible'
   );
   }
           };
   
           const layers = document.getElementById('menu');
           layers.appendChild(link);
       }
      
//       ポップアップ表示
      map.on('click', '演習林-林班', (e) => {
        
new mapboxgl.Popup()
.setLngLat(e.lngLat)
.setHTML(e.features[0].properties.面積)
.addTo(map);
});
 
// Change the cursor to a pointer when
// the mouse is over the states layer.
map.on('mouseenter', '演習林-林班', () => {
map.getCanvas().style.cursor = 'pointer';
});
 
// Change the cursor back to a pointer
// when it leaves the states layer.
map.on('mouseleave', '演習林-林班', () => {
map.getCanvas().style.cursor = '';
});
     
    }); 

//3d2d
class PitchToggle {
    constructor({ pitch = 60, minpitchzoom = 0 }) {
      
      this._pitch = pitch;
      this._minpitchzoom = minpitchzoom;
    }
  
    onAdd(map) {
      this._map = map;
      let _this = this;
  
      this._btn = document.createElement("button");
      this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
      this._btn.type = "button";
      this._btn["aria-label"] = "Toggle Pitch";
      this._btn.onclick = function() {
        if (map.getPitch() === 0) {
          let options = { pitch: _this._pitch };
          if (_this._minpitchzoom && map.getZoom() > _this._minpitchzoom) {
            options.zoom = _this._minpitchzoom;
          }
          map.easeTo(options);
          _this._btn.className =
            "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d";
        } else {
          map.easeTo({ pitch: 0 });
          _this._btn.className =
            "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
        }
      };
  
      this._container = document.createElement("div");
      this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
      this._container.appendChild(this._btn);
  
      return this._container;
    }
  
    onRemove() {
      this._container.parentNode.removeChild(this._container);
      this._map = undefined;
    }
  }
//2d3d

    map.addControl(
        ({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })
    );

    //フルスクリーン
    map.addControl(new mapboxgl.FullscreenControl());
    //コンパス
    map.addControl(new mapboxgl.NavigationControl());
    //2d3d
    map.addControl(new PitchToggle({ minpitchzoom: 0, }),);
    // 現在地
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
              
            },
            trackUserLocation: true,
            showUserHeading: true,
        })
    );
  


//ローカル検索
    const customData = {
        'features': [
            {
                'type': 'Feature',
                'properties': {
                    'title': '森の四寸傘<br>#もりのよんすんがさ#自力建設'
                },
                'geometry': {
                    'coordinates': [136.92125816984827, 35.552150926132796],
                    'type': 'Point'
                }
            },
              {
      "type": "Feature",
      "properties": {
        "title": "ウッドラボ<br>#校内#うっどらぼ#"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.91755682229996,
          35.55567864710063
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "ウッドデッキ<br>#校内#うっどでっき"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.917654722929,
          35.55554335595902
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "アカデミーセンター<br>#校内#あかでみーせんたー"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.91775798797607,
          35.55537315065003
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "事務局<br>#校内#じむきょく"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.91752664744854,
          35.55522203858251
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "学生ホール<br>#校内#がくせいほーる"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.91797256469727,
          35.55550244125428
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "メディアラボ<br>#校内#めでぃあらぼ"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.91819787025452,
          35.55567210076034
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "フォレストラボ<br>#校内#ふぉれすとらぼ"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.91877052187917,
          35.55581393801393
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "車庫<br>#校内#かまぼこ#しゃこ"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.9193123281002,
          35.555662281248864
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "森のコテージ<br>#校内#もりのこてーじ"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.9189877808094,
          35.554906175254146
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "テクニカルセンターB<br>#校内#テクB#てくにかるせんたーびー#てくびー"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.91891804337502,
          35.554471929337595
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "テクニカルセンターA<br>#校内#テクA#てくにかるせんたーえー#てくえー"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.91885367035866,
          35.55425589657323
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "テクニカルグラウンド<br>#校内#テクグラウンド#てくにかるぐらうんど#てくぐらうんど"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.91827699542046,
          35.55452102761194
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "林業機械学習棟<br>#校内#りんぎょうがくしゅうとう"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.91788136959076,
          35.55396130550181
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "研修棟<br>#校内#けんしゅうとう"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.9188804924488,
          35.55376163760454
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "加工棟<br>#校内#かこうとう"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.91928952932358,
          35.55364598274805
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "製材棟<br>#校内#せいざいとう"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.91912323236465,
          35.55338739534273
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "オープンラボ<br>#校内#おーぷんらぼ"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.91942766308784,
          35.55335520824446
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "森の情報センター<br>#校内#もりのじょうほうせんたー"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.9195148348808,
          35.55415879074707
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "森の工房<br>#校内#もりのこうぼう"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.91985815763474,
          35.55409659931346
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "morinos(森林総合教育センター)<br>#校内#モリノス#もりのす"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.91945046186447,
          35.5539918557373
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "森林総合研究所<br><small>#校内#もりけん#モリケン#しんりんそうごうけんきゅうじょ#</small>"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          136.92013710737228,
          35.55341467253454
        ]
      }
    },
        ],
        'type': 'FeatureCollection'
    };

    function forwardGeocoder(query) {
        const matchingFeatures = [];
        for (const feature of customData.features) {
           //大文字と小文字が異なるクエリを処理します
            // toLowerCase（）を呼び出して、ソースデータよりも。
            if (
                feature.properties.title
                    .toLowerCase()
                    .includes(query.toLowerCase())
            ) {
                // Add a tree emoji as a prefix for custom
                // data results using carmen geojson format:
                // https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
                feature['place_name'] = `🚩 ${feature.properties.title} `;
                feature['center'] = feature.geometry.coordinates;
                feature['place_type'] = ['park'];
                matchingFeatures.push(feature);
            }
        }
        return matchingFeatures;
    }

// Add the control to the map.

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  localGeocoder: forwardGeocoder,
  zoom: 17,
  placeholder: '場所検索',
  mapboxgl: mapboxgl
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));


// //スケール
// map.addControl(new mapboxgl.ScaleControl({
//   maxWidth: 200,
//   unit: 'metric'
//   }), 'top-left');

