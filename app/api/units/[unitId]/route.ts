import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  { params }: { params: { unitId: number } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db.query.units.findFirst({
    where: eq(units.id, params.unitId),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { unitId: number } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });

  const body = (await req.json()) as typeof units.$inferInsert;
  const data = await db
    .update(units)
    .set({ ...body })
    .where(eq(units.id, params.unitId))
    .returning();

  return NextResponse.json(data[0]);
};

const DELETE = async (
  _req: NextRequest,
  { params }: { params: { unitId: number } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized", { status: 401 });

  const data = await db
    .delete(units)
    .where(eq(units.id, params.unitId))
    .returning();
  return NextResponse.json(data[0]);
};
