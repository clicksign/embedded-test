class Environment < ApplicationRecord
  has_many :signers
  has_many :batches
end
