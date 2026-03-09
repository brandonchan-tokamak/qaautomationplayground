import React, { useState, FormEvent } from "react";

export default function Forms() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    hobbies: [] as string[],
    country: "",
    comments: "",
    agreeTerms: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      if (name === "hobbies") {
        const newHobbies = target.checked
          ? [...formData.hobbies, value]
          : formData.hobbies.filter((h) => h !== value);
        setFormData({ ...formData, hobbies: newHobbies });
      } else {
        setFormData({ ...formData, [name]: target.checked });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Forms</h1>
        <p className="text-slate-600 mt-2">
          Fill out complex forms with various input types.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Container */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-6">Registration Form</h2>

          <form
            id="registration-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Text Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Gender
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    id="gender-male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-slate-700">Male</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    id="gender-female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-slate-700">Female</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    id="gender-other"
                    checked={formData.gender === "other"}
                    onChange={handleChange}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-slate-700">Other</span>
                </label>
              </div>
            </div>

            {/* Checkboxes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Hobbies
              </label>
              <div className="flex flex-wrap gap-4">
                {["Reading", "Sports", "Music", "Travel"].map((hobby) => (
                  <label key={hobby} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="hobbies"
                      value={hobby.toLowerCase()}
                      id={`hobby-${hobby.toLowerCase()}`}
                      checked={formData.hobbies.includes(hobby.toLowerCase())}
                      onChange={handleChange}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700">{hobby}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Select Dropdown */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="">Select a country...</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="in">India</option>
              </select>
            </div>

            {/* Textarea */}
            <div>
              <label
                htmlFor="comments"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Comments
              </label>
              <textarea
                id="comments"
                name="comments"
                rows={3}
                value={formData.comments}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              ></textarea>
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  id="agree-terms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                  required
                />
                <span className="text-sm text-slate-700">
                  I agree to the terms and conditions
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="submit-form"
              className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Submit Registration
            </button>
          </form>
        </div>

        {/* Result Container */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit sticky top-8">
          <h2 className="text-xl font-semibold mb-4">Form Data</h2>
          <p className="text-sm text-slate-500 mb-4">
            The submitted data will appear here.
          </p>

          {submitted ? (
            <div
              id="form-result"
              className="bg-slate-50 p-4 rounded-lg border border-slate-200 overflow-auto"
            >
              <pre className="text-sm text-slate-800 whitespace-pre-wrap">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center text-slate-500 italic">
              Form not submitted yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
