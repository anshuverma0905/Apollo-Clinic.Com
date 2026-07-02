import React, { useState } from 'react';
import { Star, MessageSquare, Filter, MessageCircleHeart, CheckCircle2 } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data';
import { Review } from '../types';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  
  // Custom review writing form state
  const [showWriteForm, setShowWriteForm] = useState<boolean>(false);
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(5);
  const [newText, setNewText] = useState<string>('');
  const [submittedMessage, setSubmittedMessage] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) {
      setFormError('Please fill in both your name and review text.');
      return;
    }

    const createdReview: Review = {
      id: `rev-local-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      text: newText,
      date: 'Just now',
      source: 'Verified Patient'
    };

    setReviews([createdReview, ...reviews]);
    setNewAuthor('');
    setNewRating(5);
    setNewText('');
    setFormError('');
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowWriteForm(false);
    }, 2500);
  };

  const filteredReviews = reviews.filter((rev) => {
    if (ratingFilter === 'all') return true;
    if (ratingFilter === 'positive') return rev.rating >= 4;
    if (ratingFilter === 'critical') return rev.rating <= 3;
    return rev.rating === parseInt(ratingFilter, 10);
  });

  return (
    <div className="bg-slate-50 py-16 border-t border-slate-200" id="patient-reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 text-blue-800 text-xs font-black uppercase tracking-widest">
              <MessageCircleHeart className="w-3.5 h-3.5" />
              <span>Real Patient Feedbacks</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-black text-blue-900 tracking-tighter font-display uppercase leading-none">
              REVIEWS & PATIENT EXPERIENCES
            </h3>
            <p className="text-sm text-slate-600 max-w-xl font-medium leading-relaxed">
              See actual verified testimonies from patients in Colaba and overseas who trust us with their clinical diagnostics and treatments.
            </p>
          </div>

          <button
            onClick={() => setShowWriteForm(!showWriteForm)}
            className="bg-white border-2 border-slate-300 hover:border-blue-900 text-slate-800 font-black text-xs uppercase tracking-widest px-6 py-4.5 transition-all cursor-pointer flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-blue-900" />
            <span>Write a Patient Review</span>
          </button>
        </div>

        {/* Interactive Review Form */}
        {showWriteForm && (
          <div className="bg-white border-2 border-slate-350 p-6 mb-10 max-w-2xl mx-auto animate-fade-in">
            {submittedMessage ? (
              <div className="text-center py-6 space-y-3 text-blue-900">
                <CheckCircle2 className="w-12 h-12 mx-auto text-yellow-500" />
                <h4 className="font-black text-lg uppercase tracking-wider">Thank you for your feedback!</h4>
                <p className="text-xs text-slate-500 font-medium">Your review has been successfully registered on our clinic wall.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <h4 className="font-black text-blue-900 text-sm uppercase tracking-wider border-l-4 border-blue-900 pl-2">Write about your Apollo Clinic visit</h4>
                
                {formError && (
                  <p className="text-xs text-rose-600 font-black uppercase tracking-wider">{formError}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Amit Sharma"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full p-2.5 border-2 border-slate-200 text-sm focus:outline-hidden focus:border-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 mb-1">Rating (1 to 5 Stars)</label>
                    <div className="flex items-center gap-1.5 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="focus:outline-hidden cursor-pointer"
                        >
                          <Star className={`w-6 h-6 ${star <= newRating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 mb-1">Your Detailed Experience</label>
                  <textarea
                    rows={3}
                    placeholder="Describe clinical support, physician counseling, wait times, or test reports..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="w-full p-2.5 border-2 border-slate-200 text-sm focus:outline-hidden focus:border-blue-900"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowWriteForm(false)}
                    className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-900 hover:bg-blue-950 text-white text-xs font-black uppercase tracking-widest px-5 py-3 transition-all cursor-pointer"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black text-slate-500 flex items-center gap-1 mr-2 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5" /> Filter by:
            </span>
            {[
              { label: 'All Reviews', value: 'all' },
              { label: 'Positive (4-5 ★)', value: 'positive' },
              { label: 'Critical (1-3 ★)', value: 'critical' },
              { label: '5 Stars Only', value: '5' }
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setRatingFilter(f.value)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-2 ${
                  ratingFilter === f.value
                    ? 'bg-blue-900 border-blue-900 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            Showing <strong className="text-blue-900 font-black">{filteredReviews.length}</strong> of {reviews.length} reviews
          </span>
        </div>

        {/* Reviews Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 text-xs font-bold uppercase tracking-wider">
              No patient reviews matching the selected filter.
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border-2 border-slate-200 hover:border-blue-900 p-6 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  {/* Rating Stars & Source */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= rev.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-100'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 border ${
                      rev.source === 'Google' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {rev.source} Review
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    "{rev.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{rev.author}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{rev.date}</span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
