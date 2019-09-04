class AddColumnKeyToDocuments < ActiveRecord::Migration[5.2]
  def change
    add_column :documents, :key, :uuid
  end
end
