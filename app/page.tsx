import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, MessageCircle, Sparkles, Star, Wand2, Zap, Heart, Brain } from 'lucide-react'
import Image from "next/image"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#00BFA5] to-[#6EC5E9]">
        <div 
          className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-EQNlV89TXbkesk1fY52ClkOlNBOTNy.jpeg')] bg-cover bg-center mix-blend-overlay opacity-50"
          style={{ backgroundPosition: '50% 30%' }}
        />
        <div className="container relative mx-auto px-6 py-32 md:py-40">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
                Where Stories Come Alive!
              </h1>
              <p className="text-xl md:text-2xl text-white/90 drop-shadow">
                Join our magical storytelling adventure with an AI friend who brings imagination to life, creating unforgettable stories for young minds.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-[#FFA726] hover:bg-[#FF6F61] text-white text-lg px-8 py-6 rounded-full shadow-lg transition-all hover:scale-105">
                  Start Your Story
                </Button>
                <Button size="lg" variant="outline" className="text-black border-white hover:bg-white/20 text-lg px-8 py-6 rounded-full shadow-lg transition-all hover:scale-105">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] hidden md:block">
              <Image
                src="/placeholder.svg"
                alt="Storytelling illustration"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-32" id ="features">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-[#333333]">
          Magical Features for Young Minds
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          <Card className="p-8 hover:shadow-xl transition-all hover:scale-105 border-t-4 border-t-[#A461D8]">
            <BookOpen className="w-16 h-16 text-[#A461D8] mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Endless Stories</h3>
            <p className="text-gray-600 text-lg">
              Dive into a world of limitless tales, where every story is unique and tailored to your child&quot;s interests.
            </p>
          </Card>
          <Card className="p-8 hover:shadow-xl transition-all hover:scale-105 border-t-4 border-t-[#6FCF97]">
            <MessageCircle className="w-16 h-16 text-[#6FCF97] mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Interactive Chat</h3>
            <p className="text-gray-600 text-lg">
              Engage in lively conversations with our AI storyteller, shaping the narrative as you go along.
            </p>
          </Card>
          <Card className="p-8 hover:shadow-xl transition-all hover:scale-105 border-t-4 border-t-[#FFD43B]">
            <Sparkles className="w-16 h-16 text-[#FFD43B] mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Learning Fun</h3>
            <p className="text-gray-600 text-lg">
              Discover educational content woven seamlessly into captivating stories, making learning an adventure.
            </p>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-r from-[#A461D8] to-[#6EC5E9] text-white py-32">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
            How StoryBot Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full p-6 inline-block mb-6">
                <Wand2 className="w-12 h-12 text-[#A461D8]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Choose a Theme</h3>
              <p className="text-lg">Select from various exciting story themes.</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full p-6 inline-block mb-6">
                <Zap className="w-12 h-12 text-[#FFA726]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">AI Magic</h3>
              <p className="text-lg">Our AI crafts a unique story just for you.</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full p-6 inline-block mb-6">
                <MessageCircle className="w-12 h-12 text-[#6FCF97]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Interact</h3>
              <p className="text-lg">Chat with characters and shape the story.</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full p-6 inline-block mb-6">
                <Heart className="w-12 h-12 text-[#FF6F61]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Enjoy & Learn</h3>
              <p className="text-lg">Have fun while learning valuable lessons.</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-[#00BFA5] text-white py-32" id ="aboutus">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">About StoryBot</h2>
              <p className="text-xl">
                At StoryBot, we believe in the power of storytelling to inspire, educate, and entertain young minds. Our AI-powered chatbot is designed to create personalized, interactive stories that spark creativity and foster a love for reading.
              </p>
              <p className="text-xl">
                Founded by a team of educators, technologists, and parents, StoryBot combines cutting-edge AI with a deep understanding of child development to deliver an unparalleled storytelling experience.
              </p>
              <Button 
                size="lg" 
                className="bg-[#FFA726] hover:bg-[#FF6F61] text-white text-lg px-8 py-6 rounded-full shadow-lg transition-all hover:scale-105"
              >
                Our Story
              </Button>
            </div>
            <div className="relative h-[400px] md:h-[600px]">
              <Image
                src="/placeholder.svg"
                alt="StoryBot team"
                fill
                className="object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-[#E4E4E4] py-32">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-[#333333]">
            What Parents Say
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-10 bg-white hover:shadow-xl transition-all hover:scale-105">
              <div className="flex gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-[#FFA726] text-[#FFA726]" />
                ))}
              </div>
              <p className="text-gray-600 text-lg mb-6">
                StoryBot has transformed bedtime for us. My daughter is always excited to continue her personalized story adventure. It&quot;s both entertaining and educational!
              </p>
              <p className="font-semibold text-lg">- Parent of Alex, 7</p>
            </Card>
            <Card className="p-10 bg-white hover:shadow-xl transition-all hover:scale-105">
              <div className="flex gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-[#FFA726] text-[#FFA726]" />
                ))}
              </div>
              <p className="text-gray-600 text-lg mb-6">
              &quot;I&quot;m amazed at how StoryBot adapts to my son&quot;s interests. It&quot;s helped improve his vocabulary and sparked a love for storytelling. Highly recommended!&quot;
              </p>
              <p className="font-semibold text-lg">- Parent of Sam, 5</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-[#6FCF97] to-[#6EC5E9] text-white py-32">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
            Benefits of StoryBot
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <Brain className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Cognitive Development</h3>
              <p className="text-lg">Enhance problem-solving skills and creativity through interactive storytelling.</p>
            </div>
            <div className="text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Language Skills</h3>
              <p className="text-lg">Improve vocabulary and language comprehension with engaging narratives.</p>
            </div>
            <div className="text-center">
              <Heart className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Emotional Intelligence</h3>
              <p className="text-lg">Develop empathy and understanding through character interactions and story outcomes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#FF6F61] text-white py-32">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Start the Adventure?
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            Join thousands of families discovering the joy of interactive storytelling. Start your journey today!
          </p>
          <Button 
            size="lg" 
            className="bg-[#FFA726] hover:bg-[#00BFA5] text-white text-lg px-12 py-6 rounded-full shadow-lg transition-all hover:scale-105"
          >
            Begin Your Free Trial
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#333333] text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="hover:text-[#FFA726] transition-colors">Home</a>
            <a href="#aboutus" className="hover:text-[#FFA726] transition-colors">About</a>
            <a href="#features" className="hover:text-[#FFA726] transition-colors">Features</a>
            <a href="#" className="hover:text-[#FFA726] transition-colors">Pricing</a>
            <a href="#" className="hover:text-[#FFA726] transition-colors">Contact</a>
          </div>
          <p className="opacity-70 text-lg">
            © 2024 StoryBot. All rights reserved. Made with love for young minds.
          </p>
        </div>
      </footer>
    </div>
  )
}

