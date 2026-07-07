import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import FormInput from '../components/FormInput.jsx';
import FormOptionGroup from '../components/FormOptionGroup.jsx';
import Button from '../components/Button.jsx';
import { validateFitnessForm } from '../utils/validateFitnessForm.js';
import api from '../services/api.js';

const initialFormData = {
  name: '',
  age: '',
  gender: '',
  height: '',
  weight: '',
  fitnessGoal: '',
  activityLevel: '',
  dietPreference: '',
};

function Generate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const validationErrors = validateFitnessForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/generate-plan', formData);
      navigate('/plan', { state: { plan: response.data.plan, userData: formData } });
    } catch (err) {
      const message =
        err.response?.data?.error ||
        'Something went wrong while generating your plan. Please try again.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 md:px-12 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-3">
            Tell Us About Yourself
          </h1>
          <p className="text-slate-500">
            Fill in your details and we'll generate a personalized fitness plan for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          <FormInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g. Alex"
            required={false}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInput
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="e.g. 25"
              error={errors.age}
              required
            />

            <FormInput
              label="Height (cm)"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="e.g. 170"
              error={errors.height}
              required
            />
          </div>

          <FormInput
            label="Weight (kg)"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="e.g. 65"
            error={errors.weight}
            required
          />

          <FormOptionGroup
            label="Gender"
            name="gender"
            options={['Male', 'Female', 'Other']}
            value={formData.gender}
            onChange={handleOptionChange}
            error={errors.gender}
          />

          <FormOptionGroup
            label="Fitness Goal"
            name="fitnessGoal"
            options={['Weight Loss', 'Muscle Gain', 'Maintain Weight']}
            value={formData.fitnessGoal}
            onChange={handleOptionChange}
            error={errors.fitnessGoal}
          />

          <FormOptionGroup
            label="Activity Level"
            name="activityLevel"
            options={['Beginner', 'Intermediate', 'Advanced']}
            value={formData.activityLevel}
            onChange={handleOptionChange}
            error={errors.activityLevel}
          />

          <FormOptionGroup
            label="Diet Preference"
            name="dietPreference"
            options={['Vegetarian', 'Vegan', 'Non-Vegetarian']}
            value={formData.dietPreference}
            onChange={handleOptionChange}
            error={errors.dietPreference}
          />

          {submitError && (
            <p className="text-sm text-red-500 text-center">{submitError}</p>
          )}

          <Button type="submit" className="w-full justify-center mt-4" disabled={isSubmitting}>
            {isSubmitting ? 'Generating Your Plan...' : 'Generate Plan'}
          </Button>
        </form>
      </main>
    </div>
  );
}

export default Generate;