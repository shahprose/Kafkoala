/Users/shahprose/kafka_2.13-2.7.0/bin/kafka-producer-perf-test.sh \
    --topic market_data_1 \
    --throughput -1 \
    --producer-props bootstrap.servers=localhost:9092 \
    --payload-file ../data/test_payloads_b.json \
    --num-records 23647 &

/Users/shahprose/kafka_2.13-2.7.0/bin/kafka-producer-perf-test.sh \
    --topic market_data_2 \
    --throughput -1 \
    --producer-props bootstrap.servers=localhost:9092 \
    --payload-file ../data/test_payloads_b.json \
    --num-records 34738 &

/Users/shahprose/kafka_2.13-2.7.0/bin/kafka-producer-perf-test.sh \
    --topic market_data_3 \
    --throughput -1 \
    --producer-props bootstrap.servers=localhost:9092 \
    --payload-file ../data/test_payloads_b.json \
    --num-records 5326 &

/Users/shahprose/kafka_2.13-2.7.0/bin/kafka-producer-perf-test.sh \
    --topic market_data_4 \
    --throughput -1 \
    --producer-props bootstrap.servers=localhost:9092 \
    --payload-file ../data/test_payloads_b.json \
    --num-records 2342 &