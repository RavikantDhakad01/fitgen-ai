import jsPDF from 'jspdf';

const MARGIN = 14;
const PAGE_WIDTH = 210; // A4 width in mm
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const LINE_HEIGHT = 6;

function addSectionTitle(doc, title, y) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(5, 150, 105); // emerald-600
  doc.text(title, MARGIN, y);
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.line(MARGIN, y + 2, PAGE_WIDTH - MARGIN, y + 2);
  return y + 10;
}

function ensureSpace(doc, y, neededHeight) {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (y + neededHeight > pageHeight - MARGIN) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

function addWrappedText(doc, text, y, options = {}) {
  const { fontSize = 10.5, color = [51, 65, 85], bold = false } = options;
  doc.setFont('helvetica', bold ? 'bold' : 'normal');
  doc.setFontSize(fontSize);
  doc.setTextColor(...color);

  const lines = doc.splitTextToSize(text, CONTENT_WIDTH);
  let currentY = y;

  lines.forEach((line) => {
    currentY = ensureSpace(doc, currentY, LINE_HEIGHT);
    doc.text(line, MARGIN, currentY);
    currentY += LINE_HEIGHT;
  });

  return currentY;
}

export function generatePlanPdf(plan, userData = {}) {
  if (!plan) return;

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = MARGIN;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42); // slate-950
  doc.text('FitGen AI - Personalized Fitness Plan', MARGIN, y);
  y += 12;

  // User Details
  y = addSectionTitle(doc, 'User Details', y);
  const userLines = [
    userData.name ? `Name: ${userData.name}` : null,
    userData.age ? `Age: ${userData.age}` : null,
    userData.gender ? `Gender: ${userData.gender}` : null,
    userData.height ? `Height: ${userData.height} cm` : null,
    userData.weight ? `Weight: ${userData.weight} kg` : null,
    userData.fitnessGoal ? `Fitness Goal: ${userData.fitnessGoal}` : null,
    userData.activityLevel ? `Activity Level: ${userData.activityLevel}` : null,
    userData.dietPreference ? `Diet Preference: ${userData.dietPreference}` : null,
  ].filter(Boolean);

  y = addWrappedText(doc, userLines.length ? userLines.join('   |   ') : 'Not available.', y);
  y += 6;

  // BMI
  y = ensureSpace(doc, y, 20);
  y = addSectionTitle(doc, 'BMI', y);
  const bmiText = plan.bmi?.value
    ? `${plan.bmi.value} (${plan.bmi.category || 'N/A'})`
    : 'Not available.';
  y = addWrappedText(doc, bmiText, y);
  y += 6;

  // Daily Calories
  y = ensureSpace(doc, y, 20);
  y = addSectionTitle(doc, 'Daily Calories', y);
  y = addWrappedText(
    doc,
    plan.dailyCalories ? `${plan.dailyCalories} kcal/day` : 'Not available.',
    y
  );
  y += 6;

  // Water Intake
  y = ensureSpace(doc, y, 20);
  y = addSectionTitle(doc, 'Water Intake', y);
  y = addWrappedText(
    doc,
    plan.waterIntakeLiters ? `${plan.waterIntakeLiters} liters/day` : 'Not available.',
    y
  );
  y += 6;

  // Sleep Recommendation
  y = ensureSpace(doc, y, 20);
  y = addSectionTitle(doc, 'Sleep Recommendation', y);
  y = addWrappedText(
    doc,
    plan.sleepHours ? `${plan.sleepHours} hours/night` : 'Not available.',
    y
  );
  y += 6;

  // Diet Plan
  y = ensureSpace(doc, y, 30);
  y = addSectionTitle(doc, 'Diet Plan', y);
  if (plan.dietPlan) {
    const { breakfast, lunch, dinner, snacks } = plan.dietPlan;
    y = addWrappedText(doc, `Breakfast: ${breakfast || 'N/A'}`, y);
    y = addWrappedText(doc, `Lunch: ${lunch || 'N/A'}`, y);
    y = addWrappedText(doc, `Dinner: ${dinner || 'N/A'}`, y);
    y = addWrappedText(doc, `Snacks: ${snacks || 'N/A'}`, y);
  } else {
    y = addWrappedText(doc, 'Not available.', y);
  }
  y += 6;

  // 7-Day Workout Plan
  y = ensureSpace(doc, y, 30);
  y = addSectionTitle(doc, '7-Day Workout Plan', y);
  if (Array.isArray(plan.workoutPlan) && plan.workoutPlan.length > 0) {
    plan.workoutPlan.forEach((day, index) => {
      y = ensureSpace(doc, y, 16);
      const dayLabel = `${day.day || `Day ${index + 1}`}${day.focus ? ` - ${day.focus}` : ''}`;
      y = addWrappedText(doc, dayLabel, y, { bold: true, color: [15, 23, 42] });

      if (Array.isArray(day.exercises) && day.exercises.length > 0) {
        y = addWrappedText(doc, day.exercises.map((ex) => `- ${ex}`).join('\n'), y);
      } else {
        y = addWrappedText(doc, 'Exercises not available.', y);
      }
      y += 3;
    });
  } else {
    y = addWrappedText(doc, 'Not available.', y);
  }
  y += 6;

  // Health Tips
  y = ensureSpace(doc, y, 30);
  y = addSectionTitle(doc, 'Health Tips', y);
  if (Array.isArray(plan.healthTips) && plan.healthTips.length > 0) {
    y = addWrappedText(doc, plan.healthTips.map((tip) => `- ${tip}`).join('\n'), y);
  } else {
    y = addWrappedText(doc, 'Not available.', y);
  }

  const fileName = userData.name
    ? `${userData.name.replace(/\s+/g, '_')}_Fitness_Plan.pdf`
    : 'FitGen_AI_Fitness_Plan.pdf';

  doc.save(fileName);
}