/Users/shahprose/kafka_2.13-2.7.0/bin/kafka-producer-perf-test.sh \
    --topic TRUCK_ENGINE_SENSORS \
    --throughput -1 \
    --producer-props bootstrap.servers=localhost:9092 \
    --payload-file ../data/truck_engine_sensors.json \
    --num-records 1000000 &
