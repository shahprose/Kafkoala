/Users/shahprose/kafka_2.13-2.7.0/bin/kafka-producer-perf-test.sh \
    --topic financial_sells \
    --throughput -1 \
    --producer-props bootstrap.servers=localhost:9092 \
    --payload-file ../data/truck_engine_sensors.json \
    --num-records 10000 &

 /Users/shahprose/kafka_2.13-2.7.0/bin/kafka-producer-perf-test.sh \
    --topic financial_buys \
    --throughput -1 \
    --producer-props bootstrap.servers=localhost:9092 \
    --payload-file ../data/truck_engine_sensors.json \
    --num-records 10000 &