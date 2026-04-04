#!/bin/bash

# Base directory (run from project root)

BASE_DIR="src"

# Create new directories (if not already existing)

mkdir -p $BASE_DIR/components/pricing
mkdir -p $BASE_DIR/services

# Create new files

touch $BASE_DIR/components/pricing/CalendarView.tsx
touch $BASE_DIR/services/calendar.ts

echo "✅ Calendar components and services created successfully!"
