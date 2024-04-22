import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  { params }: { params: { lessonId: number } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, params.lessonId),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { lessonId: number } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });

  const body = (await req.json()) as typeof lessons.$inferInsert;
  const data = await db
    .update(lessons)
    .set({ ...body })
    .where(eq(lessons.id, params.lessonId))
    .returning();

  return NextResponse.json(data[0]);
};

const DELETE = async (
  _req: NextRequest,
  { params }: { params: { lessonId: number } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db
    .delete(lessons)
    .where(eq(lessons.id, params.lessonId))
    .returning();
  return NextResponse.json(data[0]);
};
