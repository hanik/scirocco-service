## 1. 토크나이즈
### 1-1. 영어 토크나이즈
```
th tools/tokenize.lua \
-case_feature true  \
-segment_case true  \
-segment_numbers true  \
-joiner_annotate true  \
-mode aggressive \
< ~/OpenNMT/lawData/rawData/20180528-법제처,FTA_취합-특수문자제거안함/8.AllInOne_EN_20180528_TRAIN.txt >  \
~/OpenNMT/lawData/rawData/20180528-법제처,FTA_취합-특수문자제거안함/8.AllInOne_EN_20180528_TRAIN.tok.txt

th tools/tokenize.lua \
-case_feature true  \
-segment_case true  \
-segment_numbers true  \
-joiner_annotate true  \
-mode aggressive \
< ~/OpenNMT/lawData/rawData/20180528-법제처,FTA_취합-특수문자제거안함/8.AllInOne_EN_20180528_VALID.txt >  \
~/OpenNMT/lawData/rawData/20180528-법제처,FTA_취합-특수문자제거안함/8.AllInOne_EN_20180528_VALID.tok.txt
```

### 1-2. 한글 토크나이즈
```
th tools/tokenize.lua \
-case_feature true  \
-segment_case true  \
-segment_numbers true  \
-joiner_annotate true  \
-mode aggressive \
-mecab true \
< ~/OpenNMT/lawData/rawData/20180528-법제처,FTA_취합-특수문자제거안함/8.AllInOne_KO_20180528_TRAIN.txt >  \
~/OpenNMT/lawData/rawData/20180528-법제처,FTA_취합-특수문자제거안함/8.AllInOne_KO_20180528_TRAIN.tok.txt

th tools/tokenize.lua \
-case_feature true  \
-segment_case true  \
-segment_numbers true  \
-joiner_annotate true  \
-mode aggressive \
-mecab true \
< ~/OpenNMT/lawData/rawData/20180528-법제처,FTA_취합-특수문자제거안함/8.AllInOne_KO_20180528_VALID.txt >  \
~/OpenNMT/lawData/rawData/20180528-법제처,FTA_취합-특수문자제거안함/8.AllInOne_KO_20180528_VALID.tok.txt
```




## 2. 프리프로세서
###2-1. 영한 프리프로세서
```
th preprocess.lua  \
-train_src ~/OpenNMT/lawData/rawData/20180528-법제처,FTA_취합-특수문자제거안함/8.AllInOne_EN_20180528_TRAIN.tok.txt \
-train_tgt ~/OpenNMT/lawData/rawData/20180528-법제처,FTA_취합-특수문자제거안함/8.AllInOne_KO_20180528_TRAIN.tok.txt \
-valid_src ~/OpenNMT/lawData/rawData/20180528-법제처,FTA_취합-특수문자제거안함/8.AllInOne_EN_20180528_VALID.tok.txt \
-valid_tgt ~/OpenNMT/lawData/rawData/20180528-법제처,FTA_취합-특수문자제거안함/8.AllInOne_KO_20180528_VALID.tok.txt \
-save_data ~/OpenNMT/lawData/PreProcessed/20180528_EnKo_data/20180528_EnKo_data \
-src_vocab_size 200000 -tgt_vocab_size 100000 \
-src_seq_length 200 \
-tgt_seq_length 200

nohup th train.lua -config lawData/config_EnKr.txt -gpuid 1 > 20180511_EnKr.log &
```


###2-2.한영 프리프로세서
```
th preprocess.lua  \
-train_src ~/OpenNMT/lawData/rawData/20180517-법체처,FTA_취합-특수문자제거/6.AllInOne_KO_20180517_TRAIN.tok.txt \
-train_tgt ~/OpenNMT/lawData/rawData/20180517-법체처,FTA_취합-특수문자제거/6.AllInOne_EN_20180517_TRAIN.tok.txt \
-valid_src ~/OpenNMT/lawData/rawData/20180517-법체처,FTA_취합-특수문자제거/6.AllInOne_KO_20180517_TRAIN.tok.txt \
-valid_tgt ~/OpenNMT/lawData/rawData/20180517-법체처,FTA_취합-특수문자제거/6.AllInOne_EN_20180517_TRAIN.tok.txt \
-save_data ~/OpenNMT/lawData/PreProcessed/20180517_KoEn_data-2/20180517_KoEn_data \
-src_vocab_size 200000 \
-tgt_vocab_size 100000 \
-src_seq_length 200 \
-tgt_seq_length 200

nohup th train.lua -config lawData/config_KrEn.txt -gpuid 2 > 20180511_KrEn.log &
```



## 3. Train(학습)
###3-1. Config 설정 예제
####1) Train 시키는 경우
```
data       = /home/gaplant/OpenNMT/lawData/PreProcessed/20180517_EnKo_data/20180517_EnKo_data-train.t7
save_model = /home/gaplant/OpenNMT/lawData/models/20180517-1/EnKr/20180517_law-EnKo-model
src_vocab  = /home/gaplant/OpenNMT/lawData/PreProcessed/20180517_EnKo_data/20180517_EnKo_data.src.dict
tgt_vocab  = /home/gaplant/OpenNMT/lawData/PreProcessed/20180517_EnKo_data/20180517_EnKo_data.tgt.dict
features_vocabs_prefix = /home/gaplant/OpenNMT/lawData/PreProcessed/20180517_EnKo_data/20180517_EnKo_data
layers = 2
rnn_size = 512
max_batch_size = 512
log_file = /home/gaplant/OpenNMT/lawData/log/config_EnKo_20180517-1.log
encoder_type = dbrnn
validation_metric = bleu
save_validation_translation_every = 1
```


####2) ReTrain 시키는 경우
```
data                  = /home/gaplant/OpenNMT/lawData/PreProcessed/20180528_EnKo_data/20180528_EnKo_data-train.t7
save_model             = /home/gaplant/OpenNMT/lawData/models/20180528_Retrain/EnKo/20180528_law_Retrain-EnKo-model
train_from             = /home/gaplant/OpenNMT/lawData/models/mk2_dbrnn_4000k_layser4_rnn1024/_epoch16_4.24.t7
log_file               = /home/gaplant/OpenNMT/lawData/log/config_EnKo_Retrain_20180528.log
update_vocab = merge
end_epoch = 50
layers = 4
encoder_type = dbrnn
rnn_size = 1024
src_vocab_size = 100000
tgt_vocab_size = 100000
max_batch_size = 100
```


###3-2. train 명령어
####1) train
```
th train.lua -config lawData/config_EnKo_20180517-2.txt -gpuid 1
th train.lua -config lawData/config_EnKo_20180517-3.txt -gpuid 1
```
####2) retrain
--continue 는 기존 설정을 그대로 가져가기로 --continue 를 하지 않으면 새로 설정한 config 설정대로 Retrain 함
```
th train.lua -config lawData/config_EnKo_Retrain_20180517-3.txt -gpuid 1 -continue
th train.lua -config lawData/config_EnKo_Retrain_20180517-2.txt -gpuid 1 -continue

```


##4. REST API 서버
아래와 같은 방식으로실행!, 중간에 \t 문자가 들어가면 절대 안됨!!
````
echo "#1. port 6060 : mk2 50 만건 + 법령 1차 정제 50만건"
nohup th tools/rest_translation_server.lua -model ./model/20180717_2/EnKo/20180717_2_law-EnKo-model_epoch13_2.14.t7 \
    -gpuid 3 \
    -host 0.0.0.0 \
    -port 6060 \
    -case_feature true \
    -segment_case true \
    -segment_numbers true \
    -joiner_annotate true \
    -mode aggressive \
    -replace_unk_tagged true \
    -length_norm 1 \
    -beam_size 10 \
    -batch_size 128 \
    -mecab true &

````
