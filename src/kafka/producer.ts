import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
export const produceMessage = async (message: any) => {
  await producer.connect();
  await producer.send({
    topic: "axios_integration",
    messages: [{ value: message }],
  });
};
