export function validateFitnessForm(data) {
  const errors = {};

  const age = Number(data.age);
  if (!data.age.trim()) {
    errors.age = 'Age is required.';
  } else if (Number.isNaN(age) || age < 10 || age > 100) {
    errors.age = 'Enter a valid age between 10 and 100.';
  }

  if (!data.gender) {
    errors.gender = 'Please select your gender.';
  }

  const height = Number(data.height);
  if (!data.height.trim()) {
    errors.height = 'Height is required.';
  } else if (Number.isNaN(height) || height < 100 || height > 250) {
    errors.height = 'Enter a valid height between 100 and 250 cm.';
  }

  const weight = Number(data.weight);
  if (!data.weight.trim()) {
    errors.weight = 'Weight is required.';
  } else if (Number.isNaN(weight) || weight < 30 || weight > 300) {
    errors.weight = 'Enter a valid weight between 30 and 300 kg.';
  }

  if (!data.fitnessGoal) {
    errors.fitnessGoal = 'Please select your fitness goal.';
  }

  if (!data.activityLevel) {
    errors.activityLevel = 'Please select your activity level.';
  }

  if (!data.dietPreference) {
    errors.dietPreference = 'Please select your diet preference.';
  }

  return errors;
}