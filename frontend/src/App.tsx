
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Diagnostics from "./pages/Diagnostics";
import RaisecTest from "./pages/RaisecTest";
import RaisecResults from "./pages/RaisecResults";
import AnxietyTest from "./pages/AnxietyTest";
import OceanTest from "./pages/OceanTest";
import TestResults from "./pages/TestResults";
import Careers from "./pages/Careers";
import CareerDetails from "./pages/CareerDetails";
import Education from "./pages/Education";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import NotFound from "./pages/NotFound";
import AnixityManifist from "./pages/anxityManifistTest";
import AnxietyExams from "./pages/anxityExams";
import AnxietyFutur from "./pages/anxityFutur";
import Depression from "./pages/depression";
import SelfEsteem from "./pages/selfEsteem";
import InternetAddiction from "./pages/internetAddiction";
import StressPsychologique from "./pages/stressPsychologique";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/diagnostics/raisec" element={<RaisecTest />} />
          <Route path="/diagnostics/raisec/results" element={<RaisecResults />} />
          <Route path="/diagnostics/ocean" element={<OceanTest />} />
          {/* <Route path="/diagnostics/:diagnostic" element={<AnxietyTest />} /> */}
          <Route path="/diagnostics/anxiety-manifeste" element={<AnixityManifist />} />
          <Route path="/diagnostics/exam-anxiety" element={<AnxietyExams />} />
          <Route path="/diagnostics/future-anxiety" element={<AnxietyFutur />} />
          <Route path="/diagnostics/depression" element={<Depression />} />
          <Route path="/diagnostics/self-esteem" element={<SelfEsteem />} />
          <Route path="/diagnostics/internet-addiction" element={<InternetAddiction />} />
          <Route path="/diagnostics/stress-psychologique" element={<StressPsychologique />} />
          <Route path="/diagnostics/:testId/results" element={<TestResults />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:careerId" element={<CareerDetails />} />
          <Route path="/education" element={<Education />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:articleId" element={<BlogArticle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
