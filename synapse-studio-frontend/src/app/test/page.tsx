import type { Metadata } from "next";
import { TestSpace } from "./TestSpace";

export const metadata: Metadata = {
  title: "测试空间",
};

export default function TestPage() {
  return <TestSpace />;
}
